package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @Column(name = "pid")
    private Long pid;

    @Column(name = "pname")
    private String pname;

    @Column(name = "pdescription")
    private String pdescription;

    @Column(name = "uid")
    private Long managerId;

    public Long getPid() { return pid; }
    public void setPid(Long pid) { this.pid = pid; }
    public String getPname() { return pname; }
    public void setPname(String pname) { this.pname = pname; }
    public String getPdescription() { return pdescription; }
    public void setPdescription(String pdescription) { this.pdescription = pdescription; }
    public Long getManagerId() { return managerId; }
    public void setManagerId(Long managerId) { this.managerId = managerId; }
}
