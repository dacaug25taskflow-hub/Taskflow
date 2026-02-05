package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.QueryDto;
import com.example.demo.entities.ManagerQuery;
import com.example.demo.services.ManagerQueryService;

@RestController
@RequestMapping("/manager/queries")
@CrossOrigin
public class ManagerQueryController {

    private final ManagerQueryService service;
 
    public ManagerQueryController(ManagerQueryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ManagerQuery> create(@RequestBody ManagerQuery query) {
        return ResponseEntity.ok(service.createQuery(query));
    }

    @GetMapping
    public ResponseEntity<List<ManagerQuery>> getAll() {
        return ResponseEntity.ok(service.getAllQueries());
    }

    @PutMapping("/{qid}/respond")
    public ResponseEntity<ManagerQuery> respond(
            @PathVariable Long qid,
            @RequestParam String response) {
        return ResponseEntity.ok(service.respondQuery(qid, response));
    }

    @GetMapping("/project/{pid}")
    public ResponseEntity<List<ManagerQuery>> byProject(@PathVariable Long pid) {
        return ResponseEntity.ok(service.getQueriesByProject(pid));
    }

    /** Role-based: queries for manager by mgruid (with raised by name, team leader name) */
    @GetMapping("/manager/{uid}")
    public ResponseEntity<List<QueryDto>> byManager(@PathVariable Long uid) {
        return ResponseEntity.ok(service.getQueriesByManagerEnriched(uid));
    }

    /** Role-based: queries by team_id (filter by team leader) */
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<QueryDto>> byTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(service.getQueriesByTeamEnriched(teamId));
    }

    @DeleteMapping("/{qid}")
    public ResponseEntity<Void> delete(@PathVariable Long qid) {
        service.deleteQuery(qid);
        return ResponseEntity.noContent().build();
    }
}
