package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    // find project by primary key
    Optional<Project> findByPid(int pid);

    // find projects by client name
    List<Project> findByClient(String client);

    // find projects by project name
    List<Project> findByPname(String pname);
}