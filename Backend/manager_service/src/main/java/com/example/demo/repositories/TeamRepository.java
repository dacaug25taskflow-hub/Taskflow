package com.example.demo.repositories;
import java.util.Optional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Team;

import jakarta.transaction.Transactional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    // All members of a project
    List<Team> findByPid(Long pid);

    // Check if user is already in project
    boolean existsByUidAndPid(Long uid, Long pid);

    // Get team record by user
    List<Team> findByUid(Long uid);
    
    @Transactional
    void deleteByUidAndPid(Long uid, Long pid);
    
    Optional<Team> findByUidAndPid(Long uid, Long pid);
}
