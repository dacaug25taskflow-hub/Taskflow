package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.QueryDto;
import com.example.demo.entities.ManagerQuery;
import com.example.demo.entities.Project;
import com.example.demo.entities.Team;
import com.example.demo.entities.User;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.QueryRepository;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class ManagerQueryService {

    private final QueryRepository queryRepo;
    private final UserRepository userRepo;
    private final TeamRepository teamRepo;
    private final ProjectRepository projectRepo;

    public ManagerQueryService(QueryRepository queryRepo, UserRepository userRepo,
                              TeamRepository teamRepo, ProjectRepository projectRepo) {
        this.queryRepo = queryRepo;
        this.userRepo = userRepo;
        this.teamRepo = teamRepo;
        this.projectRepo = projectRepo;
    }

    public ManagerQuery createQuery(ManagerQuery q) {
        q.setStatus("OPEN");
        return queryRepo.save(q);
    }

    public ManagerQuery respondQuery(Long qid, String response) {
        ManagerQuery q = queryRepo.findById(qid)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        q.setResponse(response);
        q.setStatus("RESPONDED");
        return queryRepo.save(q);
    }

    public List<ManagerQuery> getAllQueries() {
        return queryRepo.findAll();
    }

    public List<ManagerQuery> getQueriesByProject(Long pid) {
        return queryRepo.findByFkPid(pid);
    }

    public List<ManagerQuery> getQueriesByManager(Long uid) {
        return queryRepo.findByMgruid(uid);
    }

    public List<ManagerQuery> getQueriesByTeam(Long teamId) {
        return queryRepo.findByTeamidFk(teamId);
    }

    public List<QueryDto> getQueriesByManagerEnriched(Long mgruid) {
        List<ManagerQuery> queries = queryRepo.findByMgruid(mgruid);
        return enrichQueries(queries);
    }

    public List<QueryDto> getQueriesByTeamEnriched(Long teamId) {
        List<ManagerQuery> queries = queryRepo.findByTeamidFk(teamId);
        return enrichQueries(queries);
    }

    private List<QueryDto> enrichQueries(List<ManagerQuery> queries) {
        List<QueryDto> dtos = new ArrayList<>();
        for (ManagerQuery q : queries) {
            QueryDto dto = new QueryDto();
            dto.setQid(q.getQid());
            dto.setQuery(q.getQuery());
            dto.setQname(q.getQname());
            dto.setTeamidFk(q.getTeamidFk());
            dto.setFkPid(q.getFkPid());
            dto.setMgruid(q.getMgruid());
            dto.setResponse(q.getResponse());
            dto.setStatus(q.getStatus());
            dto.setRaisedByUid(q.getRaisedByUid());

            if (q.getRaisedByUid() != null) {
                userRepo.findByUid(q.getRaisedByUid().intValue())
                        .ifPresent(u -> dto.setRaisedByName((u.getFname() != null ? u.getFname() : "") + " " + (u.getLname() != null ? u.getLname() : "")));
            }
            teamRepo.findById(q.getTeamidFk()).ifPresent(team -> {
                userRepo.findByUid(team.getUid().intValue())
                        .ifPresent(u -> dto.setTeamLeaderName((u.getFname() != null ? u.getFname() : "") + " " + (u.getLname() != null ? u.getLname() : "")));
                if (q.getRaisedByUid() != null && q.getRaisedByUid().equals(team.getUid())) {
                    dto.setSource("TEAM_LEADER");
                } else {
                    dto.setSource("EMPLOYEE");
                }
            });
            projectRepo.findById(q.getFkPid()).ifPresent(p -> dto.setProjectName(p.getPname()));
            if (dto.getSource() == null) dto.setSource("EMPLOYEE");

            dtos.add(dto);
        }
        return dtos;
    }

    public void deleteQuery(Long qid) {
        queryRepo.deleteById(qid);
    }
}
