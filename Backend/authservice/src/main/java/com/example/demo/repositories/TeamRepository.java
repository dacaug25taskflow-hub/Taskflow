package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    // find all team records for a user
    List<Team> findByUserUid(int uid);

    // find all team records for a project
    List<Team> findByProjectPid(int pid);
}