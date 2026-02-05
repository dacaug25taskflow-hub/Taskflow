package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByPid(Long pid);
    List<Task> findByUid(Long uid);
}
