package com.example.demo.admin.controllers;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping; // ✅ MUST BE THIS
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.admin.dto.AdminCreateUserDto;
import com.example.demo.admin.dto.AdminUpdateUserDto;
import com.example.demo.admin.dto.ProfileUpdateDto;
import com.example.demo.admin.dto.UserDto;
import com.example.demo.admin.services.AdminUserService;
import com.example.demo.entities.User;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/admin/users")
@Validated
public class AdminUserController {

    private final AdminUserService service;

    public AdminUserController(AdminUserService service) {
        this.service = service;
    }

    // CREATE USER
    @PostMapping
    public ResponseEntity<User> createUser(
            @Valid @RequestBody AdminCreateUserDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createUser(dto));
    }

    // UPDATE USER
    @PutMapping("/{uid}")
    public ResponseEntity<User> updateUser(
            @PathVariable int uid,
            @Valid @RequestBody AdminUpdateUserDto dto) {

        return ResponseEntity.ok(service.updateUser(uid, dto));
    }

    // CHANGE PASSWORD (validates current password, updates in DB)
    @PutMapping("/{uid}/password")
    public ResponseEntity<String> changePassword(
            @PathVariable int uid,
            @RequestBody ChangePasswordRequest req) {
        service.changePassword(uid, req.currentPassword, req.newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }

    // DELETE USER
    @DeleteMapping("/{uid}")
    public ResponseEntity<Void> deleteUser(@PathVariable int uid) {
        service.deleteUser(uid);
        return ResponseEntity.noContent().build();
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    // GET USER BY ID (for profile)
    @GetMapping("/{uid}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int uid) {
        return ResponseEntity.ok(service.getUserById(uid));
    }

    // UPDATE OWN PROFILE (fname, lname, email, phone, address only - no uid, role, username)
    @PutMapping("/{uid}/profile")
    public ResponseEntity<User> updateProfile(
            @PathVariable int uid,
            @RequestBody ProfileUpdateDto req) {
        return ResponseEntity.ok(service.updateProfile(uid, req));
    }

    public static class ChangePasswordRequest {
        public String currentPassword;
        public String newPassword;
    }

}
