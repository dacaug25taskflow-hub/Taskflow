package com.example.demo.dto;

public class UserLogin {
	String login;
	String pwd;
	public UserLogin() {
		super();
	}
	public UserLogin(String login, String pwd) {
		super();
		this.login = login;
		this.pwd = pwd;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
		
}
