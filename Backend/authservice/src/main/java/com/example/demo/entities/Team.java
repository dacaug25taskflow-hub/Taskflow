package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private int teamId;

    @ManyToOne
    @JoinColumn(name = "uid")
    @JsonIgnoreProperties("teams")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pid")
    @JsonIgnoreProperties("teams")
    private Project project;

    public Team() {
        super();
    }

    public Team(User user, Project project) {
        this.user = user;
        this.project = project;
    }

    public int getTeam_id() {
        return teamId;
    }

    public void setTeam_id(int team_id) {
        this.teamId = team_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}