package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ProjectDashboardDto;
import com.example.demo.entities.Project;
import com.example.demo.services.ManagerProjectService;

@RestController
@RequestMapping("/manager/projects")
@CrossOrigin
public class ManagerProjectController {

    private final ManagerProjectService service;

    public ManagerProjectController(ManagerProjectService service) {
        this.service = service;
    }

    // Get projects by manager id
    @GetMapping("/manager/{uid}")
    public ResponseEntity<List<Project>> getProjects(@PathVariable Long uid) {
        return ResponseEntity.ok(service.getProjectsByManager(uid));
    }

    // Get project by id
    @GetMapping("/{pid}")
    public ResponseEntity<Project> getProject(@PathVariable Long pid) {
        return ResponseEntity.ok(service.getProjectById(pid));
    }
    
    @GetMapping("/{pid}/status")
    public ResponseEntity<String> getStatus(@PathVariable Long pid) {
        return ResponseEntity.ok(service.getProjectStatus(pid));
    }
    
    @GetMapping("/{pid}/dashboard")
    public ResponseEntity<ProjectDashboardDto> dashboard(
            @PathVariable Long pid) {

        return ResponseEntity.ok(service.getDashboard(pid));
    }

}
