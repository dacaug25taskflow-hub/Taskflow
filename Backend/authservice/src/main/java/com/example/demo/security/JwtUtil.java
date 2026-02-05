package com.example.demo.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // ✅ 32+ chars (256-bit minimum)
    private static final String SECRET =
            "taskflow-super-secret-key-256-bits-long-123456";

    private static final long EXPIRATION = 1000 * 60 * 60; // 1 hour

    public String generateToken(int uid, String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("uid", uid)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(
                        Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }
}
