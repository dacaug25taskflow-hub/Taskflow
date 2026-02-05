package com.example.demo.admin.dto;

import java.time.LocalDate;

public class AdminCreateProjectDto {

    private String pname;
    private String pdescription;
    private int uid;
    private String client;
    private LocalDate asDate;
    private LocalDate deadline;
    private String comment;
    private Integer domainId;
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
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public LocalDate getAsDate() {
		return asDate;
	}
	public void setAsDate(LocalDate asDate) {
		this.asDate = asDate;
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
	public Integer getDomainId() {
		return domainId;
	}
	public void setDomainId(Integer domainId) {
		this.domainId = domainId;
	}
    
}
