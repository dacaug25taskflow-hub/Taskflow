package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    // find task by task id
    Task findByTaskId(int taskId);

    // find all tasks of a project
    List<Task> findByProjectPid(int pid);

    // find all tasks assigned to a user
    List<Task> findByUserUid(int uid);

    // find tasks by status
    List<Task> findByStatus(String status);
}