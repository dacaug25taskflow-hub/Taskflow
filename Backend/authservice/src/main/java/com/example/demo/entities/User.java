package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	@Column(nullable = false, unique = true)
	private String uname;
	
	String fname;
	String lname;
	@Column(nullable = false)
	private String pwd;
	@Column(nullable = false, unique = true)
	private String email;

	
	@Column(nullable = false)
	private String phone;
	
	String address;

	@ManyToOne
	@JoinColumn(name = "rid")
	@JsonIgnoreProperties("user")
	Role role;

	public User() {
		super();
	}

	public User(int uid, String uname, String fname, String lname, String pwd, String email, String phone,
			String address, Role role) {
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
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
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

}
