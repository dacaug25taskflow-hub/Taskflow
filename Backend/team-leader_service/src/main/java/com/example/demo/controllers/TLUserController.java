package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ProfileUpdateDto;
import com.example.demo.entities.User;
import com.example.demo.services.TLUserService;

@RestController
@RequestMapping("/tl/users")
@CrossOrigin
public class TLUserController {

    private final TLUserService service;

    public TLUserController(TLUserService service) {
        this.service = service;
    }

    @GetMapping("/{uid}")
    public ResponseEntity<User> getProfile(@PathVariable Long uid) {
        return ResponseEntity.ok(service.getProfile(uid));
    }

    @PutMapping("/{uid}/profile")
    public ResponseEntity<User> updateProfile(
            @PathVariable Long uid,
            @RequestBody ProfileUpdateDto req) {
        return ResponseEntity.ok(service.updateProfile(uid, req));
    }

    @PutMapping("/{uid}/password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long uid,
            @RequestBody ChangePasswordRequest req) {
        service.changePassword(uid, req.currentPassword, req.newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }

    public static class ChangePasswordRequest {
        public String currentPassword;
        public String newPassword;
    }
}
