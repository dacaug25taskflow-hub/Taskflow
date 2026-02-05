package com.example.demo.admin.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.admin.dto.*;
import com.example.demo.admin.services.AdminProjectService;
import com.example.demo.entities.Project;

@RestController
@RequestMapping("/admin/projects")
public class AdminProjectController {

    private final AdminProjectService service;

    public AdminProjectController(AdminProjectService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody AdminCreateProjectDto dto) {
        return ResponseEntity.ok(service.createProject(dto));
    }

    @PutMapping("/{pid}")
    public ResponseEntity<Project> update(
            @PathVariable int pid,
            @RequestBody AdminUpdateProjectDto dto) {
        return ResponseEntity.ok(service.updateProject(pid, dto));
    }

    @DeleteMapping("/{pid}")
    public ResponseEntity<Void> delete(@PathVariable int pid) {
        service.deleteProject(pid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAll() {
        return ResponseEntity.ok(service.getAllProjects());
    }
    
    @GetMapping("/{pid}")
    public ResponseEntity<ProjectDto> getById(@PathVariable int pid) {
        return ResponseEntity.ok(service.getProjectById(pid));
    }
    
    @PutMapping("/{pid}/assign/{uid}")
    public ResponseEntity<Project> assignProject(
            @PathVariable int pid,
            @PathVariable int uid) {

        return ResponseEntity.ok(service.assignProject(pid, uid));
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(service.getProjectCount());
    }



}
