package com.example.demo.admin.dto;

import java.time.LocalDate;

public class ProjectDto {
    private int pid;
    private String pname;
    private String pdescription;
    private String client;
    private LocalDate deadline;
    private String comment;
    private LocalDate asDate;
    
    // Manager information
    private Integer managerId;
    private String managerName;
    
    // Domain information
    private Integer domainId;
    private String domainName;

    public ProjectDto() {}

    // Getters and Setters
    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPdescription() {
        return pdescription;
    }

    public void setPdescription(String pdescription) {
        this.pdescription = pdescription;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getAsDate() {
        return asDate;
    }

    public void setAsDate(LocalDate asDate) {
        this.asDate = asDate;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public Integer getDomainId() {
        return domainId;
    }

    public void setDomainId(Integer domainId) {
        this.domainId = domainId;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }
}
