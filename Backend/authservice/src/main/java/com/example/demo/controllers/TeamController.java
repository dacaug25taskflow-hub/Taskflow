package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Team;
import com.example.demo.services.TeamService;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // CREATE team entry (assign user to project)
    @PostMapping("/save")
    public Team saveTeam(@RequestBody Team team) {
        return teamService.saveTeam(team);
    }

    // GET teams by user
    @GetMapping("/getbyuser/{uid}")
    public List<Team> getTeamsByUser(@PathVariable int uid) {
        return teamService.getTeamsByUser(uid);
    }

    // GET teams by project
    @GetMapping("/getbyproject/{pid}")
    public List<Team> getTeamsByProject(@PathVariable int pid) {
        return teamService.getTeamsByProject(pid);
    }

    // GET all teams
    @GetMapping("/all")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    // DELETE team entry
    @DeleteMapping("/delete/{id}")
    public String deleteTeam(@PathVariable int id) {
        teamService.deleteTeam(id);
        return "Team entry deleted successfully";
    }
}