package com.example.demo.admin.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.admin.services.AdminUserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    private final AdminUserService service;

    public AdminDashboardController(AdminUserService service) {
        this.service = service;
    }

    @GetMapping("/counts")
    public Map<String, Long> getCounts() {
        return service.getDashboardCounts();
    }
}
