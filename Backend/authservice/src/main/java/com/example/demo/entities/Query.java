package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "query")
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;

    @Column(nullable = false)
    private String query;

    @ManyToOne
    @JoinColumn(name = "teamid_fk")
    @JsonIgnoreProperties("queries")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "fk_pid")
    @JsonIgnoreProperties("queries")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "mgruid")
    @JsonIgnoreProperties("queries")
    private User manager;

    private String response;

    @Column(nullable = false)
    private String status;

    public Query() {
        super();
    }

    // getters & setters

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
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