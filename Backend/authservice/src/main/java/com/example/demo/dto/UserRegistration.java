package com.example.demo.dto;
import jakarta.validation.constraints.*;

public class UserRegistration {


	    @NotBlank(message = "Username cannot be empty")
	    @Size(min = 4, max = 20, message = "Username must be 4–20 characters")
	    private String uname;

	    @NotBlank(message = "First name is required")
	    @Pattern(regexp = "^[A-Z][a-z]+$", message = "First name must start with capital letter")
	    private String fname;

	    @NotBlank(message = "Last name is required")
	    @Pattern(regexp = "^[A-Z][a-z]+$", message = "Last name must start with capital letter")
	    private String lname;

	    @NotBlank(message = "Password is required")
	    @Size(min = 6, message = "Password must be at least 6 characters")
	    private String pwd;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    private String email;

	    @NotBlank(message = "Phone number is required")
	    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
	    private String phone;

	    @NotBlank(message = "Address is required")
	    private String address;

	    @NotNull(message = "Role must be selected")
	    private Integer rid;


    // Default constructor
    public UserRegistration() {
        super();
    }

    // Constructor with all fields
    public UserRegistration(String uname, String fname, String lname, String pwd, String email, String phno,
                            String address, Integer rid) {
        super();
        this.uname = uname;
        this.fname = fname;
        this.lname = lname;
        this.pwd = pwd;
        this.email = email;
        this.phone = phno;
        this.address = address;
        this.rid = rid;
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

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }
}
