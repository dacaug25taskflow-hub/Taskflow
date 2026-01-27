package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Team;
import com.example.demo.repositories.TeamRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    // SAVE / ADD user to project
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    // GET teams by user
    public List<Team> getTeamsByUser(int uid) {
        return teamRepository.findByUserUid(uid);
    }

    // GET teams by project
    public List<Team> getTeamsByProject(int pid) {
        return teamRepository.findByProjectPid(pid);
    }

    // GET all teams
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    // DELETE team entry
    public void deleteTeam(int teamId) {
        teamRepository.deleteById(teamId);
    }
}