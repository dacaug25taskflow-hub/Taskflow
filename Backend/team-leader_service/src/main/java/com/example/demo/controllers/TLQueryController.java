package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.QueryDto;
import com.example.demo.entities.TLQuery;
import com.example.demo.services.TLQueryService;

@RestController
@RequestMapping("/tl/query")
@CrossOrigin
public class TLQueryController {

    private final TLQueryService service;

    public TLQueryController(TLQueryService service) {
        this.service = service;
    }

    @PostMapping("/{tlUid}")
    public TLQuery send(
            @PathVariable Long tlUid,
            @RequestBody TLQuery q) {
        return service.send(q, tlUid);
    }

    /** Get queries visible to TL (from employees + TL's own raised) */
    @GetMapping("/team-leader/{tlUid}")
    public List<QueryDto> getQueriesForTeamLeader(@PathVariable Long tlUid) {
        return service.getQueriesForTeamLeader(tlUid);
    }

    /** TL responds to employee query */
    @PutMapping("/{qid}/respond")
    public TLQuery respond(
            @PathVariable Long qid,
            @RequestParam String response,
            @RequestParam Long tlUid) {
        return service.respond(qid, response, tlUid);
    }
}
