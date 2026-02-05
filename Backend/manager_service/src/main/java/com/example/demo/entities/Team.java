package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "team")
@Getter
@Setter
public class Team {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long teamId;

    @Column(name = "uid")
    private Long uid;  // Team Leader
    
    @Column(name = "pid")
    private Long pid;

    public Long getTeamId() { return teamId; }
	public void setTeamId(Long teamId) { this.teamId = teamId; }
	public Long getUid() { return uid; }
	public void setUid(Long uid) { this.uid = uid; }
	public Long getPid() { return pid; }
	public void setPid(Long pid) { this.pid = pid; }
}
