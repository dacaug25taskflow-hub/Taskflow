package com.example.demo.services;

import com.example.demo.dto.ProfileUpdateDto;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ManagerUserService {

    private final UserRepository userRepo;

    public ManagerUserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void changePassword(int uid, String currentPassword, String newPassword) {
        User user = userRepo.findByUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!currentPassword.equals(user.getPwd())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPwd(newPassword);
        userRepo.save(user);
    }

    public User getProfile(int uid) {
        return userRepo.findByUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(int uid, ProfileUpdateDto req) {
        User user = userRepo.findByUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (req.getFname() != null) user.setFname(req.getFname());
        if (req.getLname() != null) user.setLname(req.getLname());
        if (req.getEmail() != null && !req.getEmail().isEmpty()) user.setEmail(req.getEmail());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        return userRepo.save(user);
    }
}
