import React, { useState } from "react";
import { register } from "../services/authService";

const Register = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    uname: "",
    fname: "",
    lname: "",
    email: "",
    pwd: "",
    phno: "",
    address: "",
    roleId: 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration Successful");
      switchToLogin();
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="uname" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="fname" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="pwd" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phno" placeholder="Phone Number" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <div className="switch">
        Already have an account?{" "}
        <span onClick={switchToLogin}>Login</span>
      </div>
    </div>
  );
};

export default Register;