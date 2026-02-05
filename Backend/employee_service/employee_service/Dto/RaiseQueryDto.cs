namespace employee_service.Dto
{
    public class RaiseQueryDto
    {
        public string Query { get; set; } = null!;
        public string? Qname { get; set; }
        public int TeamId { get; set; }
        public int ProjectId { get; set; }
        public int ManagerUid { get; set; }
        public int RaisedByUid { get; set; }  // Employee uid when employee raises (optional)
    }

}
