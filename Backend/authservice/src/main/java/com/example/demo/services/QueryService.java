package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Query;
import com.example.demo.repositories.QueryRepository;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // SAVE / CREATE
    public Query saveQuery(Query query) {
        return queryRepository.save(query);
    }

    // GET BY ID
    public Query getQueryById(int qid) {
        return queryRepository.findByQid(qid);
    }

    // GET BY STATUS
    public List<Query> getQueriesByStatus(String status) {
        return queryRepository.findByStatus(status);
    }

    // GET BY PROJECT
    public List<Query> getQueriesByProject(int pid) {
        return queryRepository.findByProjectPid(pid);
    }

    // GET BY TEAM
    public List<Query> getQueriesByTeam(int team_id) {
        return queryRepository.findByTeamTeamId(team_id);
    }

    // GET BY MANAGER
    public List<Query> getQueriesByManager(int uid) {
        return queryRepository.findByManagerUid(uid);
    }

    // GET ALL
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // DELETE
    public void deleteQuery(int qid) {
        queryRepository.deleteById(qid);
    }
}