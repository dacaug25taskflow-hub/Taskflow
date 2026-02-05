package com.example.demo.controllers;

import com.example.demo.dto.ManagerDashboardDTO;
import com.example.demo.entities.Project;
import com.example.demo.entities.ManagerQuery;
import com.example.demo.entities.Task;
import com.example.demo.services.ManagerService;
import com.example.demo.services.ManagerTaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;
    @Autowired
    private ManagerTaskService managerTaskService;


    @GetMapping("/{managerId}/projects")
    public List<Project> getProjects(@PathVariable Long managerId) {
        return managerService.getProjects(managerId);
    }
    
    @PutMapping("/{taskId}/assign/{uid}")
    public ResponseEntity<Task> assignTask(
            @PathVariable Long taskId,
            @PathVariable Long uid) {

    	return ResponseEntity.ok(managerTaskService.assignTask(taskId, uid));
    }




    @GetMapping("/{managerId}/dashboard")
    public ManagerDashboardDTO dashboard(@PathVariable Long managerId) {
        return managerService.dashboard(managerId);
    }

    @GetMapping("/{managerId}/queries")
    public List<ManagerQuery> getQueries(@PathVariable Long managerId) {
        return managerService.getQueries(managerId);
    }
    
    @PostMapping("/{managerId}/assign-projects")
    public String assignProjectsToManager(@PathVariable Long managerId, @RequestBody List<Long> projectIds) {
        managerService.assignProjects(managerId, projectIds);
        return "Projects assigned successfully to manager with ID " + managerId;
    }


    @PutMapping("/query/{qid}")
    public ManagerQuery respond(@PathVariable Long qid,
                         @RequestParam String response) {
        return managerService.respond(qid, response);
    }
}
