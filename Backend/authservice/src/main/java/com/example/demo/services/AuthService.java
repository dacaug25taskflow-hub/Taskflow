package com.example.demo.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UserLogin;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
		super();
		this.userRepository = userRepository;
		this.jwtUtil = jwtUtil;
	}

    public LoginResponse login(UserLogin dto) {

        Optional<User> userOpt = userRepository.findByEmail(dto.getLogin());

        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByUname(dto.getLogin());
        }

        User user = userOpt.orElseThrow(() ->
            new RuntimeException("User not found")
        );

        if (!user.getPwd().equals(dto.getPwd())) {
            throw new RuntimeException("Invalid password");
        }
        
        String token = jwtUtil.generateToken(
                user.getUid(),
                user.getEmail(),
                user.getRole().getRname()
        );
        return new LoginResponse(
            user.getUid(),
            user.getUname(),
            user.getEmail(),
            user.getRole().getRname(),
            token
        );
    }

}
