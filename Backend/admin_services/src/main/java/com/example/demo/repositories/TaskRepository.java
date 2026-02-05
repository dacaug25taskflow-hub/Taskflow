package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    // Get all tasks of a project
    List<Task> findByProject_Pid(int pid);

    // Get all tasks of a user
    List<Task> findByUser_Uid(int uid);
}
