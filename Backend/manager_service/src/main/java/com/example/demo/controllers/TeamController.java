package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Team;
import com.example.demo.entities.User;
import com.example.demo.services.TeamService;


@RestController
@RequestMapping("/manager/team")
@CrossOrigin
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<Team> addMember(
            @RequestParam Long pid,
            @RequestParam Long uid) {

        return ResponseEntity.ok(service.addMember(pid, uid));
    }

    @PostMapping("/create")
    public ResponseEntity<Team> createTeam(
            @RequestBody CreateTeamRequest req) {
        return ResponseEntity.ok(service.createTeam(req.pid, req.domainId, req.tlUid));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeMember(
            @RequestParam Long pid,
            @RequestParam Long uid) {

        service.removeMember(pid, uid);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long teamId) {
        service.deleteTeam(teamId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/project/{pid}")
    public ResponseEntity<List<Team>> getMembers(@PathVariable Long pid) {
        return ResponseEntity.ok(service.getMembersByProject(pid));
    }

    @GetMapping("/team-leaders")
    public ResponseEntity<List<User>> getTeamLeaders() {
        return ResponseEntity.ok(service.getTeamLeaders());
    }

    public static class CreateTeamRequest {
        public Long pid;
        public Long domainId;
        public Long tlUid;
    }
}
