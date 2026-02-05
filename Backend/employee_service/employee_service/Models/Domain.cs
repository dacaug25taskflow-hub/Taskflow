using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class Domain
{
    public int DomainId { get; set; }

    public string? Dname { get; set; }

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
