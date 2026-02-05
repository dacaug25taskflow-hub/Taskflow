package com.example.demo.admin.dto;

public class AdminUpdateUserDto {

    private String uname;
    private String fname;
    private String lname;
    private String email;
    private String pwd;
    private String phone;
    private String address;

    // ROLE NAME
    private String role;

    // DOMAIN ID
    private Integer domainId;

    public AdminUpdateUserDto() {}

    // -------- GETTERS & SETTERS --------

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
