package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "query")
public class TLQuery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;

    @Column(name = "query")
    private String query;

    @Column(name = "teamid_fk")
    private Long teamIdFk;

    @Column(name = "fk_pid")
    private Long projectId;

    @Column(name = "raised_by_uid")
    private Long raisedByUid;

    @Column(name = "qname")
    private String qname;

    @Column(name = "mgruid")
    private Long managerUid;

    @Column(name = "response")
    private String response;

    @Column(name = "status")
    private String status;

    // -------- getters & setters --------

    public Long getQid() {
        return qid;
    }

    public void setQid(Long qid) {
        this.qid = qid;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Long getTeamIdFk() {
        return teamIdFk;
    }

    public void setTeamIdFk(Long teamIdFk) {
        this.teamIdFk = teamIdFk;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getRaisedByUid() { return raisedByUid; }
    public void setRaisedByUid(Long raisedByUid) { this.raisedByUid = raisedByUid; }
    public String getQname() { return qname; }
    public void setQname(String qname) { this.qname = qname; }

    public Long getManagerUid() {
        return managerUid;
    }

    public void setManagerUid(Long managerUid) {
        this.managerUid = managerUid;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
