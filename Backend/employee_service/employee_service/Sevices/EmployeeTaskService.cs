using employee_service.Models;

using DbTask = employee_service.Models.Task;


namespace employee_service.Services
{
    public class EmployeeTaskService
    {
        private readonly TaskflowdbContext _context;

        public EmployeeTaskService(TaskflowdbContext context)
        {
            _context = context;
        }

        // ===============================
        // GET TASKS ASSIGNED TO EMPLOYEE
        // ===============================
        public List<DbTask> GetTasksByEmployee(long uid)
        {
            return _context.Tasks
                .Where(t => t.Uid == uid)
                .ToList();
        }

        public DbTask UpdateTaskStatus(long taskId, long uid, string status)
        {
            var task = _context.Tasks
                .FirstOrDefault(t => t.TaskId == taskId && t.Uid == uid);

            if (task == null)
                throw new Exception("Task not found");

            task.Status = status;
            _context.SaveChanges();
            return task;
        }

    }
}
