package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ProjectDashboardDto;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.TaskRepository;

@Service
public class ManagerProjectService {

    private final ProjectRepository projectRepo;
    private final TaskRepository taskRepo;

    public ManagerProjectService(ProjectRepository projectRepo,
                                 TaskRepository taskRepo) {
        this.projectRepo = projectRepo;
        this.taskRepo = taskRepo;
    }

    public List<Project> getProjectsByManager(Long uid) {
        return projectRepo.findByManagerId(uid);
    }

    public Project getProjectById(Long pid) {
        return projectRepo.findById(pid)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public String getProjectStatus(Long pid) {

        Project project = getProjectById(pid);
        List<Task> tasks = taskRepo.findByPid(pid);

        if (tasks.isEmpty()) return "Not Started";

        boolean allCompleted = true;
        boolean anyInProgress = false;

        for (Task t : tasks) {
            if (!"Completed".equalsIgnoreCase(t.getStatus())) {
                allCompleted = false;
            }
            if ("In Progress".equalsIgnoreCase(t.getStatus())) {
                anyInProgress = true;
            }
        }

        if (project.getDeadline() != null &&
            project.getDeadline().isBefore(LocalDate.now()) &&
            !allCompleted) {
            return "Delayed";
        }

        if (allCompleted) return "Completed";
        if (anyInProgress) return "In Progress";

        return "Pending";
    }

    public ProjectDashboardDto getDashboard(Long pid) {

        List<Task> tasks = taskRepo.findByPid(pid);

        long completed = tasks.stream().filter(t -> "Completed".equalsIgnoreCase(t.getStatus())).count();
        long inProgress = tasks.stream().filter(t -> "In Progress".equalsIgnoreCase(t.getStatus())).count();
        long pending = tasks.stream().filter(t -> "Pending".equalsIgnoreCase(t.getStatus())).count();
        long highPriority = tasks.stream().filter(t -> "High".equalsIgnoreCase(t.getPriority())).count();

        return new ProjectDashboardDto(
            tasks.size(), completed, inProgress, pending, highPriority
        );
    }
}
