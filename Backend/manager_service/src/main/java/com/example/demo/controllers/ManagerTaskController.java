package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Task;
import com.example.demo.services.ManagerTaskService;

@RestController
@RequestMapping("/manager/tasks")
@CrossOrigin
public class ManagerTaskController {

    private final ManagerTaskService service;

    public ManagerTaskController(ManagerTaskService service) {
        this.service = service;
    }

    // Create task (uid in body = assignee: manager for self, TL for team tasks)
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(service.createTask(task));
    }

    // Assign task to TL
    @PutMapping("/{taskId}/assign/{uid}")
    public ResponseEntity<Task> assignTask(
            @PathVariable Long taskId,
            @PathVariable Long uid) {

        return ResponseEntity.ok(service.assignTask(taskId, uid));
    }

    // Get tasks by project (TL tasks for Projects section)
    @GetMapping("/project/{pid}")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long pid) {
        return ResponseEntity.ok(service.getTasksByProject(pid));
    }

    // Get manager's personal tasks (for Dashboard Kanban)
    @GetMapping("/manager/{uid}")
    public ResponseEntity<List<Task>> getManagerPersonalTasks(@PathVariable Long uid) {
        return ResponseEntity.ok(service.getTasksByManager(uid));
    }

    // Update task status (for manager's personal Kanban)
    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateStatus(
            @PathVariable Long taskId,
            @RequestParam String status) {
        return ResponseEntity.ok(service.updateStatus(taskId, status));
    }

    // Update deadline
    @PutMapping("/{taskId}/deadline")
    public ResponseEntity<Task> updateDeadline(
            @PathVariable Long taskId,
            @RequestParam String date) {

        LocalDate d = LocalDate.parse(date);
        return ResponseEntity.ok(service.updateDeadline(taskId, d));
    }
}
