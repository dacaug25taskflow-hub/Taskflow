using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class Team
{
    public int TeamId { get; set; }

    public int Uid { get; set; }

    public int Pid { get; set; }

    public virtual Project PidNavigation { get; set; } = null!;

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    public virtual User UidNavigation { get; set; } = null!;
}
