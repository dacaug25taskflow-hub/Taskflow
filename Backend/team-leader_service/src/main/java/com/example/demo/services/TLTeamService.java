package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ProjectWithManagerDto;
import com.example.demo.entities.Project;
import com.example.demo.entities.Team;
import com.example.demo.entities.User;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class TLTeamService {

    private final TeamRepository repo;
    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public TLTeamService(TeamRepository repo, ProjectRepository projectRepo, UserRepository userRepo) {
        this.repo = repo;
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    public List<Team> getMembers(Long pid) {
        return repo.findByPid(pid);
    }

    /** Get projects assigned by manager to this TL, with manager name */
    public List<ProjectWithManagerDto> getProjectsForTL(Long tlUid) {
        List<Team> teams = repo.findByUid(tlUid);
        List<Long> pids = teams.stream().map(Team::getPid).distinct().collect(Collectors.toList());
        List<ProjectWithManagerDto> result = new ArrayList<>();
        for (Long pid : pids) {
            Project p = projectRepo.findById(pid).orElse(null);
            if (p == null) {
                continue;
            }

            String managerName = "Manager";
            if (p.getManagerId() != null) {
                User u = userRepo.findById(p.getManagerId()).orElse(null);
                if (u != null) {
                    managerName = (u.getFname() != null ? u.getFname() : "") + " "
                            + (u.getLname() != null ? u.getLname() : "");
                }
            }

            result.add(new ProjectWithManagerDto(
                    p.getPid(),
                    p.getPname(),
                    p.getPdescription(),
                    p.getManagerId(),
                    managerName.trim()
            ));
        }
        return result;
    }
}
