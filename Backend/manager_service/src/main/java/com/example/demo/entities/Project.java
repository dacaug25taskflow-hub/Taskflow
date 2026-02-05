package com.example.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "project")
@Getter
@Setter
public class Project {

    @Id
    @Column(name = "pid")
    private Long pid;

    @Column(name = "pname")
    private String pname;

    @Column(name = "pdescription")
    private String pdescription;

    // manager user id
    @Column(name = "uid")
    private Long managerId;

    private String client;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "comment")
    private String comment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "domain_id")
    private Domain domain;

    public LocalDate getDeadline() {
        return deadline;
    }

	public Long getPid() {
		return pid;
	}

	public void setPid(Long pid) {
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

	public Long getManagerId() {
		return managerId;
	}

	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public void setDeadline(LocalDate deadline) {
		this.deadline = deadline;
	}
	public String getComment() { return comment; }
	public void setComment(String comment) { this.comment = comment; }
	public Domain getDomain() { return domain; }
	public void setDomain(Domain domain) { this.domain = domain; }
}
