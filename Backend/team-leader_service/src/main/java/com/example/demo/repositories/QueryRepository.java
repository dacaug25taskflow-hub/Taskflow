package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.TLQuery;

@Repository
public interface QueryRepository extends JpaRepository<TLQuery, Long> {

    List<TLQuery> findByProjectId(Long projectId);
    List<TLQuery> findByTeamIdFk(Long teamIdFk);
}
