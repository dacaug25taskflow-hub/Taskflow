package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Query;

@Repository
public interface QueryRepository extends JpaRepository<Query, Integer> {

    Query findByQid(int qid);

    List<Query> findByStatus(String status);

    List<Query> findByProjectPid(int pid);

    List<Query> findByTeamTeamId(int teamId);

    List<Query> findByManagerUid(int uid);
}
