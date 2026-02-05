package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entities.Team;
import com.example.demo.entities.User;
import com.example.demo.repositories.QueryRepository;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class TeamService {

    private final TeamRepository teamRepo;
    private final QueryRepository queryRepo;
    private final UserRepository userRepo;

    public TeamService(TeamRepository teamRepo, QueryRepository queryRepo, UserRepository userRepo) {
        this.teamRepo = teamRepo;
        this.queryRepo = queryRepo;
        this.userRepo = userRepo;
    }

    public Team addMember(Long pid, Long uid) {
        if (teamRepo.existsByUidAndPid(uid, pid)) {
            throw new RuntimeException("User already part of this project");
        }
        Team team = new Team();
        team.setPid(pid);
        team.setUid(uid);
        return teamRepo.save(team);
    }

    public Team createTeam(Long pid, Long domainId, Long tlUid) {
        if (teamRepo.existsByUidAndPid(tlUid, pid)) {
            throw new RuntimeException("Team Leader already assigned to this project");
        }
        Team team = new Team();
        team.setPid(pid);
        team.setUid(tlUid);
        return teamRepo.save(team);
    }

    public List<User> getTeamLeaders() {
        return userRepo.findByRole_Rname("Team Leader");
    }

    @Transactional
    public void removeMember(Long pid, Long uid) {
        Team team = teamRepo.findByUidAndPid(uid, pid)
                .orElseThrow(() -> new RuntimeException("Team member not found"));
        try {
            queryRepo.deleteQueriesByTeamId(team.getTeamId());
        } catch (Exception ignored) {}
        teamRepo.deleteByUidAndPid(uid, pid);
    }

    @Transactional
    public void deleteTeam(Long teamId) {
        Team team = teamRepo.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        try {
            queryRepo.deleteQueriesByTeamId(teamId);
        } catch (Exception ignored) {}
        teamRepo.deleteById(teamId);
    }

    public List<Team> getMembersByProject(Long pid) {
        return teamRepo.findByPid(pid);
    }
}
