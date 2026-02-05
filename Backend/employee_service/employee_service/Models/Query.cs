using System;
using System.Collections.Generic;

namespace employee_service.Models;

public partial class Query
{
    public long Qid { get; set; }

    public string? Query1 { get; set; }

    public int TeamidFk { get; set; }

    public int FkPid { get; set; }

    public int Mgruid { get; set; }

    public string? Response { get; set; }

    public string? Status { get; set; }

    public string? Qname { get; set; }

    public int? RaisedByUid { get; set; }

    public virtual Project FkP { get; set; } = null!;

    public virtual User Mgru { get; set; } = null!;

    public virtual Team TeamidFkNavigation { get; set; } = null!;
}
