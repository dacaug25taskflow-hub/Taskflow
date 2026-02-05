package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @Column(unique = true, nullable = false)
    private String uname;

    @Column(nullable = false)
    private String fname;

    @Column(nullable = false)
    private String lname;

    @Column(nullable = false)
    private String pwd;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;
    
    private String address;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    @JsonIgnore
    private Role role;
    
    @ManyToOne
    @JoinColumn(name = "domain_id")
    @JsonIgnore
    private Domain domain;


	public User() {
		super();
	}


	public User(Integer uid, String uname, String fname, String lname, String pwd, String email, String phone,
			String address, Role role, Domain domain) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.fname = fname;
		this.lname = lname;
		this.pwd = pwd;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.role = role;
		this.domain = domain;
	}


	public Integer getUid() {
		return uid;
	}


	public void setUid(Integer uid) {
		this.uid = uid;
	}


	public String getUname() {
		return uname;
	}


	public void setUname(String uname) {
		this.uname = uname;
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}


	public Domain getDomain() {
		return domain;
	}


	public void setDomain(Domain domain) {
		this.domain = domain;
	}	
    
}
