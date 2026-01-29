package com.example.demo.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "project")
public class Project {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
int pid;

String pname;
String pdescription;
String client;
LocalDate assign_date;
LocalDate deadline;
String comment;

@ManyToOne
@JoinColumn(name = "uid")
@JsonIgnoreProperties("project")
User user;

@ManyToOne
@JoinColumn(name = "domain_id")
@JsonIgnoreProperties("project")
Domain domain;

public Project() {
super();
}

public Project(int pid, String pname, String pdescription, String client,
LocalDate assign_date, LocalDate deadline, String comment,
User user, Domain domain) {
super();
this.pid = pid;
this.pname = pname;
this.pdescription = pdescription;
this.client = client;
this.assign_date = assign_date;
this.deadline = deadline;
this.comment = comment;
this.user = user;
this.domain = domain;
}

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

public LocalDate getAssign_date() {
return assign_date;
}

public void setAssign_date(LocalDate assign_date) {
this.assign_date = assign_date;
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
}