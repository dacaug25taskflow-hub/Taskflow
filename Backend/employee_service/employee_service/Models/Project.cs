using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class Project
{
    public int Pid { get; set; }

    public string? Pname { get; set; }

    public string? Pdescription { get; set; }

    public int Uid { get; set; }

    public int DomainId { get; set; }

    public string? Client { get; set; }

    public DateOnly Deadline { get; set; }

    public string? Comment { get; set; }

    public DateOnly AsDate { get; set; }

    public virtual Domain Domain { get; set; } = null!;

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();

    public virtual User UidNavigation { get; set; } = null!;
}
