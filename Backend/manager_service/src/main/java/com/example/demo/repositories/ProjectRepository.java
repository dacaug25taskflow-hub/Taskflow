package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Manager → projects
    List<Project> findByManagerId(Long managerId);
}
