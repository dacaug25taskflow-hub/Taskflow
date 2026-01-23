package com.example.demo.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
	
	//Registration Verification
	boolean existsByEmail(String email);//return true if email already exist 
	boolean existsByUname(String uname);//same 
	
	
	//Login
	Optional<User>findByUname(String uname);
	Optional<User>findByEmail(String email);
}
