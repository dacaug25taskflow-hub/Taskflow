package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Team;
import com.example.demo.services.TLTeamService;

@RestController
@RequestMapping("/tl/team")
@CrossOrigin
public class TLTeamController {

    private final TLTeamService service;

    public TLTeamController(TLTeamService service){
        this.service = service;
    }

    @GetMapping("/{pid}")
    public List<Team> members(@PathVariable Long pid) {
        return service.getMembers(pid);
    }

    @GetMapping("/projects/{tlUid}")
    public List<com.example.demo.dto.ProjectWithManagerDto> projects(@PathVariable Long tlUid) {
        return service.getProjectsForTL(tlUid);
    }
}
