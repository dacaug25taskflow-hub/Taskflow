using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class User
{
    public int Uid { get; set; }

    public string? Uname { get; set; }

    public string? Fname { get; set; }

    public string? Lname { get; set; }

    public string? Pwd { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public int RoleId { get; set; }

    public int? DomainId { get; set; }

    public virtual Domain? Domain { get; set; }

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
}
