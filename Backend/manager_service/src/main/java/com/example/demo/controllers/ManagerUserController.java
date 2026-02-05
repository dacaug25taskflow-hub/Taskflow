package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ProfileUpdateDto;
import com.example.demo.entities.User;
import com.example.demo.services.ManagerUserService;

@RestController
@RequestMapping("/manager/users")
@CrossOrigin
public class ManagerUserController {

    private final ManagerUserService service;

    public ManagerUserController(ManagerUserService service) {
        this.service = service;
    }

    @GetMapping("/{uid}")
    public ResponseEntity<User> getProfile(@PathVariable Integer uid) {
        return ResponseEntity.ok(service.getProfile(uid));
    }

    @PutMapping("/{uid}/profile")
    public ResponseEntity<User> updateProfile(
            @PathVariable Integer uid,
            @RequestBody ProfileUpdateDto req) {
        return ResponseEntity.ok(service.updateProfile(uid, req));
    }

    @PutMapping("/{uid}/password")
    public ResponseEntity<String> changePassword(
            @PathVariable Integer uid,
            @RequestBody ChangePasswordRequest req) {
        service.changePassword(uid, req.currentPassword, req.newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }

    public static class ChangePasswordRequest {
        public String currentPassword;
        public String newPassword;
    }
}
