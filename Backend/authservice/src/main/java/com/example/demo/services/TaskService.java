package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Task;
import com.example.demo.repositories.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // SAVE / CREATE
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // GET BY TASK ID
    public Task getTaskById(int taskId) {
        return taskRepository.findByTaskId(taskId);
    }

    // GET BY PROJECT
    public List<Task> getTasksByProject(int pid) {
        return taskRepository.findByProjectPid(pid);
    }

    // GET BY USER
    public List<Task> getTasksByUser(int uid) {
        return taskRepository.findByUserUid(uid);
    }

    // GET BY STATUS
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    // GET ALL
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // DELETE
    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }
}