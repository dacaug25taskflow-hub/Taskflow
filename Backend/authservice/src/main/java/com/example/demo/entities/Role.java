package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="role")
public class Role {
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	  int rid;
	 @Column
	  String rname;
	 
	 @OneToMany(mappedBy ="role")
	 @JsonIgnoreProperties("role")
	 Set<User> users;

	public Role() {
		super();
	}

	public Role(int rid, String rname, Set<User> users) {
		super();
		this.rid = rid;
		this.rname = rname;
		this.users = users;
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public String getRname() {
		return rname;
	}

	public void setRname(String rname) {
		this.rname = rname;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}
	 
	
}
