package com.example.demo.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Project;
import com.example.demo.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // SAVE / CREATE
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // GET BY ID
    public Project getProjectById(int id) {
        Project project = null;
        Optional<Project> option = projectRepository.findByPid(id);
        try {
            project = option.get();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }
        return project;
    }

    // GET BY CLIENT
    public List<Project> getProjectsByClient(String client) {
        return projectRepository.findByClient(client);
    }

    // GET BY PROJECT NAME
    public List<Project> getProjectsByName(String pname) {
        return projectRepository.findByPname(pname);
    }

    // GET ALL
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // DELETE
    public void deleteProject(int id) {
        projectRepository.deleteById(id);
    }
}