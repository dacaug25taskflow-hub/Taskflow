package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name="user")
public class User {

    @Id
    private Long uid;

    @Column(name="domain_id")
    private Long domainId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id")
    private Role role;

    private String pwd;
    private String fname;
    private String lname;
    private String uname;
    private String email;
    private String phone;
    private String address;

	public Long getUid() { return uid; }
	public void setUid(Long uid) { this.uid = uid; }
	public Long getDomainId() { return domainId; }
	public void setDomainId(Long domainId) { this.domainId = domainId; }
	public Role getRole() { return role; }
	public void setRole(Role role) { this.role = role; }
	public String getPwd() { return pwd; }
	public void setPwd(String pwd) { this.pwd = pwd; }
	public String getFname() { return fname; }
	public void setFname(String fname) { this.fname = fname; }
	public String getLname() { return lname; }
	public void setLname(String lname) { this.lname = lname; }
	public String getUname() { return uname; }
	public void setUname(String uname) { this.uname = uname; }
	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }
	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }
	public String getAddress() { return address; }
	public void setAddress(String address) { this.address = address; }
}

