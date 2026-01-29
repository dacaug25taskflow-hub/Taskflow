package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Query;
import com.example.demo.services.QueryService;

@RestController
@RequestMapping("/query")
@CrossOrigin(origins = "*")
public class QueryController {

    @Autowired
    private QueryService queryService;

    // CREATE query
    @PostMapping("/save")
    public Query saveQuery(@RequestBody Query query) {
        return queryService.saveQuery(query);
    }

    // GET query by id
    @GetMapping("/get/{id}")
    public Query getQueryById(@PathVariable int id) {
        return queryService.getQueryById(id);
    }

    // GET queries by status
    @GetMapping("/getbystatus/{status}")
    public List<Query> getQueriesByStatus(@PathVariable String status) {
        return queryService.getQueriesByStatus(status);
    }

    // GET queries by project
    @GetMapping("/getbyproject/{pid}")
    public List<Query> getQueriesByProject(@PathVariable int pid) {
        return queryService.getQueriesByProject(pid);
    }

    // GET queries by team
    @GetMapping("/getbyteam/{team_id}")
    public List<Query> getQueriesByTeam(@PathVariable int team_id) {
        return queryService.getQueriesByTeam(team_id);
    }

    // GET queries by manager
    @GetMapping("/getbymanager/{uid}")
    public List<Query> getQueriesByManager(@PathVariable int uid) {
        return queryService.getQueriesByManager(uid);
    }

    // GET all queries
    @GetMapping("/all")
    public List<Query> getAllQueries() {
        return queryService.getAllQueries();
    }

    // DELETE query
    @DeleteMapping("/delete/{id}")
    public String deleteQuery(@PathVariable int id) {
        queryService.deleteQuery(id);
        return "Query deleted successfully";
    }
}