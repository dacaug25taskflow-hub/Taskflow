using employee_service.Models;

namespace employee_service.Services
{
    public class EmployeeQueryService
    {
        private readonly TaskflowdbContext _context;

        public EmployeeQueryService(TaskflowdbContext context)
        {
            _context = context;
        }

        // ===============================
        // CREATE QUERY (EMPLOYEE → MANAGER)
        // ===============================
        public Query CreateQuery(
            long teamId,
            long projectId,
            long managerUid,
            string message
        )
        {
            var query = new Query
            {
                Query1 = message,   // maps to `query`
                TeamidFk = (int)teamId,  // NOT NULL
                FkPid = (int)projectId,  // NOT NULL
                Mgruid = (int)managerUid,// NOT NULL
                Status = "OPEN",
                Response = null
            };

            _context.Queries.Add(query);
            _context.SaveChanges();

            return query;
        }
    }
}
