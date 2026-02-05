package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.QueryDto;
import com.example.demo.entities.TLQuery;
import com.example.demo.entities.Team;
import com.example.demo.entities.User;
import com.example.demo.repositories.QueryRepository;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class TLQueryService {

    private final QueryRepository repo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;

    public TLQueryService(QueryRepository repo, TeamRepository teamRepo, UserRepository userRepo) {
        this.repo = repo;
        this.teamRepo = teamRepo;
        this.userRepo = userRepo;
    }

    public TLQuery send(TLQuery q, Long tlUid) {
        Team team = teamRepo.findByPid(q.getProjectId())
                .stream()
                .filter(t -> t.getUid().equals(tlUid))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Team Leader not part of this project"));

        q.setTeamIdFk(team.getTeamId());
        q.setRaisedByUid(tlUid);  // TL raised this query to manager
        q.setStatus("OPEN");
        q.setResponse(null);

        return repo.save(q);
    }

    /** Get queries for TL: from employees (TL can respond) + TL's own raised queries (read-only) */
    public List<QueryDto> getQueriesForTeamLeader(Long tlUid) {
        List<Team> teams = teamRepo.findByUid(tlUid);
        List<TLQuery> raw = new ArrayList<>();
        for (Team t : teams) {
            raw.addAll(repo.findByTeamIdFk(t.getTeamId()));
        }
        return enrichWithRaisedByName(raw);
    }

    private List<QueryDto> enrichWithRaisedByName(List<TLQuery> queries) {
        List<QueryDto> dtos = new ArrayList<>();
        for (TLQuery q : queries) {
            QueryDto dto = new QueryDto();
            dto.setQid(q.getQid());
            dto.setQuery(q.getQuery());
            dto.setQname(q.getQname());
            dto.setTeamIdFk(q.getTeamIdFk());
            dto.setProjectId(q.getProjectId());
            dto.setManagerUid(q.getManagerUid());
            dto.setResponse(q.getResponse());
            dto.setStatus(q.getStatus());
            dto.setRaisedByUid(q.getRaisedByUid());
            if (q.getRaisedByUid() != null) {
                userRepo.findById(q.getRaisedByUid()).ifPresent(u -> {
                    String name = ((u.getFname() != null ? u.getFname() : "") + " " + (u.getLname() != null ? u.getLname() : "")).trim();
                    dto.setRaisedByName(name.isEmpty() ? "User" : name);
                });
            }
            dtos.add(dto);
        }
        return dtos;
    }

    /** TL can only respond to employee queries, not to own queries raised to manager */
    public TLQuery respond(Long qid, String response, Long tlUid) {
        TLQuery q = repo.findById(qid).orElseThrow(() -> new RuntimeException("Query not found"));
        if (q.getRaisedByUid() != null && q.getRaisedByUid().equals(tlUid)) {
            throw new RuntimeException("Cannot respond to your own query - manager will respond");
        }
        List<Team> tlTeams = teamRepo.findByUid(tlUid);
        boolean canRespond = tlTeams.stream().anyMatch(t -> t.getTeamId().equals(q.getTeamIdFk()));
        if (!canRespond) {
            throw new RuntimeException("Not authorized to respond to this query");
        }
        q.setResponse(response);
        q.setStatus("RESPONDED");
        return repo.save(q);
    }
}

