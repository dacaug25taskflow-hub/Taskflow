using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class Task
{
    public long TaskId { get; set; }

    public string Tname { get; set; } = null!;

    public string Tdescription { get; set; } = null!;

    public int Pid { get; set; }

    public string Status { get; set; } = null!;

    public int Uid { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? DomainId { get; set; }

    public string? Priority { get; set; }

    public virtual Domain? Domain { get; set; }

    public virtual Project PidNavigation { get; set; } = null!;

    public virtual User UidNavigation { get; set; } = null!;
}
