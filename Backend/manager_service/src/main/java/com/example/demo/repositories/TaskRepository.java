package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByPid(Long pid);
    List<Task> findByUid(Long uid);
    long countByPid(Long pid);

    List<Task> findByStatus(String status);
}
