package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {
    List<Team> findByPid(Long pid);
    List<Team> findByUid(Long uid);
}

