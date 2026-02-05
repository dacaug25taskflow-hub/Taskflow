package com.example.demo.admin.dto;

import jakarta.validation.constraints.*;

public class AdminCreateUserDto {

    @NotBlank
    private String uname;

    @NotBlank
    private String fname;

    @NotBlank
    private String lname;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6)
    private String pwd;

    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;

    private String address;
    
    private Integer domainId;

    // ✅ role NAME, not ID
    @NotBlank
    private String role;

    public AdminCreateUserDto() {}

    public AdminCreateUserDto(
            String uname,
            String fname,
            String lname,
            String email,
            String pwd,
            String phone,
            String address,
            String role
    ) {
        this.uname = uname;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pwd = pwd;
        this.phone = phone;
        this.address = address;
        this.role = role;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	public Integer getDomainId() {
	    return domainId;
	}

	public void setDomainId(Integer domainId) {
	    this.domainId = domainId;
	}

   
}
