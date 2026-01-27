package com.example.demo.controllers;
import java.util.List;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserLogin;
import com.example.demo.dto.UserRegistration;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/taskflow")
public class UserController {

	
	@Autowired
	UserService userService;
	
	//Register
	@PostMapping("/register")
	public ResponseEntity<String> register(@Valid @RequestBody UserRegistration dto){
	    userService.registerUser(dto);
	    return ResponseEntity.ok("User registered successfully");
	}
	
	//Login
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody UserLogin dto){
		try {
			User user = userService.loginUser(dto);
			return ResponseEntity.ok("Login successful: Welcome" + user.getFname());
		}catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());	
		}
	}
	
	//GetAllUsers
	@RequestMapping("/users")
	public List<User> getAll(){
		return userService.getAll();
	}
}
