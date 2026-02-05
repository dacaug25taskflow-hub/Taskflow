package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;

    @Column(name = "pname")
    private String pname;

    @Column(name = "pdescription")
    private String pdescription;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "domain_id", nullable = false)
    private Domain domain;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Task> tasks;

    @Column(name = "client")
    private String client;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "comment")
    private String comment;

    @Column(name = "as_date")
    private LocalDate asDate;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Domain getDomain() {
		return domain;
	}

	public void setDomain(Domain domain) {
		this.domain = domain;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
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
}

