package com.example.demo.admin.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.admin.dto.AdminCreateUserDto;
import com.example.demo.admin.dto.AdminUpdateUserDto;
import com.example.demo.admin.dto.ProfileUpdateDto;
import com.example.demo.admin.dto.UserDto;
import com.example.demo.entities.Domain;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.DomainRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class AdminUserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final DomainRepository domainRepo;

    public AdminUserService(UserRepository userRepo,
                            RoleRepository roleRepo,
                            DomainRepository domainRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.domainRepo = domainRepo;
    }

    // ---------------- CREATE USER ----------------
    public User createUser(AdminCreateUserDto dto) {

        if (userRepo.existsByUname(dto.getUname())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepo.findByRname(dto.getRole())
                .orElseThrow(() -> new RuntimeException("Invalid role"));

        Domain domain = domainRepo.findById(dto.getDomainId())
                .orElseThrow(() -> new RuntimeException("Invalid domain"));

        User user = new User();
        user.setUname(dto.getUname());
        user.setFname(dto.getFname());
        user.setLname(dto.getLname());
        user.setPwd(dto.getPwd());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(role);
        user.setDomain(domain);

        return userRepo.save(user);
    }

    // ---------------- UPDATE USER ----------------
    public User updateUser(int uid, AdminUpdateUserDto dto) {

        User user = userRepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(dto.getUname() != null && !dto.getUname().isEmpty()) {
            user.setUname(dto.getUname());
        }

        if(dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            user.setEmail(dto.getEmail());
        }

        if(dto.getPwd() != null && !dto.getPwd().isEmpty()) {
            user.setPwd(dto.getPwd());
        }

        user.setFname(dto.getFname());
        user.setLname(dto.getLname());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());

        if (dto.getRole() != null) {
            Role role = roleRepo.findByRname(dto.getRole())
                    .orElseThrow(() -> new RuntimeException("Invalid role"));
            user.setRole(role);
        }

        if(dto.getDomainId() != null) {
            Domain domain = domainRepo.findById(dto.getDomainId())
                    .orElseThrow(() -> new RuntimeException("Invalid domain"));
            user.setDomain(domain);
        }

        return userRepo.save(user);
    }

    // ---------------- CHANGE PASSWORD ----------------
    public void changePassword(int uid, String currentPassword, String newPassword) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!currentPassword.equals(user.getPwd())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPwd(newPassword);
        userRepo.save(user);
    }

    // ---------------- DELETE USER ----------------
    public void deleteUser(int uid) {
        userRepo.deleteById(uid);
    }

    // ---------------- GET ALL USERS ----------------
    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map(this::convertToDto).toList();
    }

    // ---------------- GET USER BY ID ----------------
    public UserDto getUserById(int uid) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    // ---------------- CONVERT TO DTO ----------------
    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setUid(user.getUid());
        dto.setUname(user.getUname());
        dto.setFname(user.getFname());
        dto.setLname(user.getLname());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        
        // Role information
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getRid());
            dto.setRoleName(user.getRole().getRname());
        }
        
        // Domain information
        if (user.getDomain() != null) {
            dto.setDomainId(user.getDomain().getDomainId());
            dto.setDomainName(user.getDomain().getDname());
        }
        
        return dto;
    }

    // ---------------- UPDATE PROFILE (own profile - excludes uid, role, username) ----------------
    public User updateProfile(int uid, ProfileUpdateDto req) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (req.getFname() != null) user.setFname(req.getFname());
        if (req.getLname() != null) user.setLname(req.getLname());
        if (req.getEmail() != null && !req.getEmail().isEmpty()) user.setEmail(req.getEmail());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        return userRepo.save(user);
    }

    // ---------------- DASHBOARD COUNTS ----------------
    public Map<String, Long> getDashboardCounts() {

        Map<String, Long> counts = new HashMap<>();

        counts.put("totalUsers", userRepo.count());
        counts.put("managers", userRepo.countByRole_Rname("Manager"));
        counts.put("teamLeaders", userRepo.countByRole_Rname("Team Leader"));
        counts.put("employees", userRepo.countByRole_Rname("Employee"));

        return counts;
    }
}
