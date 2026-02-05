package com.example.demo.dto;

import java.time.LocalDate;

public class AssignTaskDTO {

    private String tname;
    private String tdescription;
    private Long pid;
    private Long uid;
    private LocalDate startDate;
    private LocalDate endDate;

    public String getTname() { return tname; }
    public void setTname(String tname) { this.tname = tname; }

    public String getTdescription() { return tdescription; }
    public void setTdescription(String tdescription) { this.tdescription = tdescription; }

    public Long getPid() { return pid; }
    public void setPid(Long pid) { this.pid = pid; }

    public Long getUid() { return uid; }
    public void setUid(Long uid) { this.uid = uid; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
