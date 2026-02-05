package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.SplitTaskDto;
import com.example.demo.entities.Task;
import com.example.demo.services.TLTaskService;

@RestController
@RequestMapping("/tl/tasks")
@CrossOrigin
public class TLTaskController {

    private final TLTaskService service;

    public TLTaskController(TLTaskService service) {
        this.service = service;
    }

    // Tasks assigned to this TL (for Dashboard Kanban)
    @GetMapping("/assigned/{tlUid}")
    public List<Task> tasksAssignedToTL(@PathVariable Long tlUid) {
        return service.getTasksAssignedToTL(tlUid);
    }

    // View tasks of project
    @GetMapping("/project/{pid}")
    public List<Task> tasks(@PathVariable Long pid) {
        return service.getTasksByProject(pid);
    }

    // Assign task to employee
    @PutMapping("/{taskId}/assign/{uid}")
    public Task assign(@PathVariable Long taskId, @PathVariable Long uid) {
        return service.assignToEmployee(taskId, uid);
    }

    // Update task status
    @PutMapping("/{taskId}/status")
    public Task status(@PathVariable Long taskId, @RequestParam String status) {
        return service.updateStatus(taskId, status);
    }

    // Project progress %
    @GetMapping("/progress/{pid}")
    public double progress(@PathVariable Long pid) {
        return service.projectProgress(pid);
    }

    @PostMapping("/split/{tlUid}")
    public ResponseEntity<Task> split(
            @PathVariable Long tlUid,
            @RequestBody SplitTaskDto dto) {

        return ResponseEntity.ok(service.splitTask(dto, tlUid));
    }
    
    
 // APPROVE TASK
    @PutMapping("/{taskId}/approve")
    public Task approve(@PathVariable Long taskId) {
        return service.approveTask(taskId);
    }

    @PutMapping("/{taskId}/reject")
    public Task reject(@PathVariable Long taskId,
                       @RequestParam String reason,
                       @RequestParam Long managerUid) {
        return service.rejectTask(taskId, reason, managerUid);
    }


}
