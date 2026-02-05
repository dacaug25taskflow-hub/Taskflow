package com.example.demo.dto;
public class LoginResponse {

    private int uid;
    private String uname;
    private String email;
    private String role;
    private String token;

    
	public LoginResponse(int uid, String uname, String email, String role, String token) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.email = email;
		this.role = role;
		this.token = token;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
