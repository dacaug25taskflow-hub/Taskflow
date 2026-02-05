package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Task;
import com.example.demo.repositories.TaskRepository;
import com.example.demo.repositories.TeamRepository;

@Service
public class ManagerTaskService {

    private final TaskRepository taskRepo;
    

    @Autowired
    private TeamRepository teamRepo;


    public ManagerTaskService(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    public Task createTask(Task task) {

    	 if (task.getPid() == null)
    	    throw new RuntimeException("Project ID is required");

        if (task.getUid() == null)
            throw new RuntimeException("Team Leader uid is required");

        if (task.getStartDate() == null || task.getEndDate() == null)
            throw new RuntimeException("Start date and End date are required");

        task.setStatus("TODO");
        return taskRepo.save(task);
    }


    public Task assignTask(Long taskId, Long tlId) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Long projectId = task.getPid();

        // ✅ ONLY validation possible right now
        boolean isInProject = teamRepo.existsByUidAndPid(tlId, projectId);

        if (!isInProject) {
            throw new RuntimeException("User is not part of this project team");
        }

        task.setUid(tlId);
        task.setStatus("TODO");

        return taskRepo.save(task);
    }


    public List<Task> getTasksByProject(Long pid) {
        return taskRepo.findByPid(pid);
    }

    public List<Task> getTasksByManager(Long managerUid) {
        return taskRepo.findByUid(managerUid);
    }

    public Task updateStatus(Long taskId, String status) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return taskRepo.save(task);
    }

    public Task updateDeadline(Long taskId, LocalDate newDate) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setEndDate(newDate);
        return taskRepo.save(task);
    }

    public long countByStatus(String status) {
        return taskRepo.findByStatus(status).size();
    }
}
