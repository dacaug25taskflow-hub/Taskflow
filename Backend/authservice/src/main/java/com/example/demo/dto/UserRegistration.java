package com.example.demo.dto;

public class UserRegistration {

    private String uname;
    private String fname;
    private String lname;
    private String pwd;
    private String email;
    private String phno;
    private String address;
    private Integer roleId; // use Integer for optional role

    // Default constructor
    public UserRegistration() {
        super();
    }

    // Constructor with all fields
    public UserRegistration(String uname, String fname, String lname, String pwd, String email, String phno,
                            String address, Integer roleId) {
        super();
        this.uname = uname;
        this.fname = fname;
        this.lname = lname;
        this.pwd = pwd;
        this.email = email;
        this.phno = phno;
        this.address = address;
        this.roleId = roleId;
    }

    // Getters and Setters
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

    public String getPhno() {
        return phno;
    }

    public void setPhno(String phno) {
        this.phno = phno;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
