using employee_service.Dto;
using employee_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace employee_service.Controllers
{
    [ApiController]
    [Route("api/employee/tasks")]
    public class EmployeeTasksController : ControllerBase
    {
        private readonly TaskflowdbContext _context;

        public EmployeeTasksController(TaskflowdbContext context)
        {
            _context = context;
        }

        // ===============================
        // GET MY TASKS
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetMyTasks([FromQuery] int? uid)
        {
            var empUid = uid ?? 0;
            if (empUid <= 0) return BadRequest("uid is required");
            var tasks = await _context.Tasks
                .Where(t => t.Uid == empUid)
                .Select(t => new
                {
                    t.TaskId,
                    t.Tname,
                    t.Tdescription,
                    t.Status,
                    t.Priority,
                    t.StartDate,
                    t.EndDate,
                    t.Pid
                })
                .ToListAsync();

            return Ok(tasks);
        }

        // ===============================
        // UPDATE TASK STATUS
        // ===============================
        [HttpPut("{taskId}/status")]
        public async Task<IActionResult> UpdateStatus(
            long taskId,
            [FromQuery] string status,
            [FromQuery] int? uid
        )
        {
            var empUid = uid ?? 0;
            if (empUid <= 0) return BadRequest("uid is required");
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound("Task not found");

            if (task.Uid != empUid)
                return StatusCode(403, "You cannot update someone else’s task");

            var s = status.ToUpper();
            if (!new[] { "TODO", "IN_PROGRESS", "DONE" }.Contains(s))
                return BadRequest("Invalid status");

            task.Status = s;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Task status updated",
                taskId,
                Status = s
            });
        }


        // ===============================
        // GET MY QUERIES (queries raised by this employee)
        // ===============================
        [HttpGet("queries")]
        public async Task<IActionResult> GetMyQueries([FromQuery] int? uid)
        {
            var empUid = uid ?? 0;
            if (empUid <= 0) return BadRequest("uid is required");
            var queries = await _context.Queries
                .Where(q => q.RaisedByUid == empUid)
                .Select(q => new
                {
                    q.Qid,
                    q.Query1,
                    q.Qname,
                    q.Status,
                    q.Response
                })
                .ToListAsync();

            return Ok(queries);
        }

        // ===============================
        // QUERY OPTIONS (for Raise Query dropdowns)
        // ===============================
        [HttpGet("query-options")]
        public async Task<IActionResult> GetQueryOptions([FromQuery] int uid)
        {
            if (uid <= 0) return BadRequest("uid is required");
            var tasks = await _context.Tasks
                .Where(t => t.Uid == uid)
                .Select(t => new { t.TaskId, t.Tname, t.Pid })
                .ToListAsync();
            var result = new List<object>();
            foreach (var t in tasks)
            {
                var project = await _context.Projects
                    .Where(p => p.Pid == t.Pid)
                    .Select(p => new { p.Uid, p.Pname })
                    .FirstOrDefaultAsync();
                var manager = project != null
                    ? await _context.Users.Where(u => u.Uid == project.Uid).Select(u => new { u.Fname, u.Lname }).FirstOrDefaultAsync()
                    : null;
                var teams = await _context.Teams
                    .Where(tm => tm.Pid == t.Pid)
                    .Select(tm => new { tm.TeamId, tm.Pid })
                    .ToListAsync();
                foreach (var team in teams)
                {
                    result.Add(new
                    {
                        TaskId = t.TaskId,
                        TaskName = t.Tname,
                        ProjectId = t.Pid,
                        ProjectName = project?.Pname ?? "",
                        ManagerId = project?.Uid ?? 0,
                        ManagerName = manager != null ? $"{manager.Fname} {manager.Lname}".Trim() : "Manager",
                        TeamId = team.TeamId,
                        TeamName = $"Team #{team.TeamId} - {project?.Pname ?? ""}"
                    });
                }
            }
            return Ok(result);
        }

        // ===============================
        // RAISE QUERY
        // ===============================
        [HttpPost("query")]
        public async Task<IActionResult> RaiseQuery([FromBody] RaiseQueryDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Query))
                return BadRequest("Query message is required");

            var query = new Query
            {
                Query1 = dto.Query,
                Qname = dto.Qname,
                TeamidFk = dto.TeamId,
                FkPid = dto.ProjectId,
                Mgruid = dto.ManagerUid,
                RaisedByUid = dto.RaisedByUid > 0 ? dto.RaisedByUid : null,
                Status = "OPEN",
                Response = null
            };

            _context.Queries.Add(query);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Query raised successfully",
                query.Qid
            });
        }

    }
}
