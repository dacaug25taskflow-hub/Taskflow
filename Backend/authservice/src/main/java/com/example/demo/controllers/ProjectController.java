package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Project;
import com.example.demo.services.ProjectService;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // CREATE project
    @PostMapping("/save")
    public Project saveProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    // GET project by id
    @GetMapping("/get/{id}")
    public Project getProjectById(@PathVariable int id) {
        return projectService.getProjectById(id);
    }

    // GET projects by client
    @GetMapping("/getbyclient/{client}")
    public List<Project> getProjectsByClient(@PathVariable String client) {
        return projectService.getProjectsByClient(client);
    }

    // GET projects by project name
    @GetMapping("/getbyname/{name}")
    public List<Project> getProjectsByName(@PathVariable String name) {
        return projectService.getProjectsByName(name);
    }

    // GET all projects
    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // DELETE project
    @DeleteMapping("/delete/{id}")
    public String deleteProject(@PathVariable int id) {
        projectService.deleteProject(id);
        return "Project deleted successfully";
    }
}