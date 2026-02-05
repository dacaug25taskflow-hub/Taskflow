package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsByPname(String pname);
}
