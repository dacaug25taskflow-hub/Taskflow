package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "query")
@Getter
@Setter
public class ManagerQuery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qid")
    private Long qid;

    @Column(name = "query")
    private String query;

    @Column(name = "qname")
    private String qname;

    @Column(name = "raised_by_uid")
    private Long raisedByUid;

    @Column(name = "teamid_fk", nullable = false)
    private Long teamidFk;

    @Column(name = "fk_pid", nullable = false)
    private Long fkPid;

    @Column(name = "mgruid", nullable = false)
    private Long mgruid;

    @Column(name = "response")
    private String response;

    @Column(name = "status")
    private String status;

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

	public String getQname() {
		return qname;
	}

	public void setQname(String qname) {
		this.qname = qname;
	}

	public Long getRaisedByUid() { return raisedByUid; }
	public void setRaisedByUid(Long raisedByUid) { this.raisedByUid = raisedByUid; }

	public Long getTeamidFk() {
		return teamidFk;
	}

	public void setTeamidFk(Long teamidFk) {
		this.teamidFk = teamidFk;
	}

	public Long getFkPid() {
		return fkPid;
	}

	public void setFkPid(Long fkPid) {
		this.fkPid = fkPid;
	}

	public Long getMgruid() {
		return mgruid;
	}

	public void setMgruid(Long mgruid) {
		this.mgruid = mgruid;
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
