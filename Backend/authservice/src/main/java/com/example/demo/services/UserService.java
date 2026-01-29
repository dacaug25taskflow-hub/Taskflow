package com.example.demo.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserLogin;
import com.example.demo.dto.UserRegistration;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository urepo;

	@Autowired
	RoleRepository rolerepo;

	// Registration
	public User registerUser(UserRegistration dto) {
		// Check email
		if (urepo.existsByEmail(dto.getEmail())) {
			throw new RuntimeException("Email already registrered");
		}

		// Check username
		if (urepo.existsByUname(dto.getUname())) {
			throw new RuntimeException("Username already taken");
		}

		Role role;
		if (dto.getRid() == null) {
			throw new RuntimeException("RoleId is required");
		}
		role = rolerepo.findById(dto.getRid()).orElseThrow(() -> new RuntimeException("Invalid Role ID"));

		// get user
		User user = new User();
		user.setUname(dto.getUname());
		user.setPwd(dto.getPwd());// later encrypt
		user.setFname(dto.getFname());
		user.setLname(dto.getLname());
		user.setEmail(dto.getEmail());
		user.setPhone(dto.getPhone());
		user.setAddress(dto.getAddress());
		user.setRole(role);

		// save user
		return urepo.save(user);
	}

	// Login
	public User loginUser(UserLogin dto) {
		Optional<User> userOpt = urepo.findByUname(dto.getLogin());
		
		if(!userOpt.isPresent()) {
			userOpt = urepo.findByEmail(dto.getLogin());
		}
		
		User user = userOpt.orElseThrow(() -> new RuntimeException("Invalid username/email"));
		
		if(!user.getPwd().equals(dto.getPwd())) {
			throw new RuntimeException("Invalid Password");
		}
		
		return user;
	}

	// findById()
	public User getOneUser(int id) {
		User user = null;
		Optional<User> option = urepo.findById(id);
		try {
			user = option.get();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return user;

	}

	// GetAllUser
	public List<User> getAll() {
		return urepo.findAll();
	}

}
