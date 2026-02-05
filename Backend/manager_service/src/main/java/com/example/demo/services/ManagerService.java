package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ManagerDashboardDTO;
import com.example.demo.entities.ManagerQuery;
import com.example.demo.entities.Project;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.QueryRepository;
import com.example.demo.repositories.TaskRepository;

@Service
public class ManagerService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private QueryRepository queryRepo;

    // Admin assigns MULTIPLE projects → manager views them
    public List<Project> getProjects(Long managerId) {
        return projectRepo.findByManagerId(managerId);
    }

    // Dashboard
    public ManagerDashboardDTO dashboard(Long managerId) {

        List<Project> projects = projectRepo.findByManagerId(managerId);
        long taskCount = 0;

        for (Project p : projects) {
            taskCount += taskRepo.countByPid(p.getPid());
        }


        long pendingQueries = queryRepo.findByMgruid(managerId)
                .stream()
                .filter(q -> "OPEN".equalsIgnoreCase(q.getStatus()))
                .count();

        return new ManagerDashboardDTO(
                (long) projects.size(),
                taskCount,
                pendingQueries
        );
    }

    // View queries
    public List<ManagerQuery> getQueries(Long managerId) {
        return queryRepo.findByMgruid(managerId);
    }

    // Respond
    public ManagerQuery respond(Long qid, String response) {
        ManagerQuery q = queryRepo.findById(qid)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        q.setResponse(response);
        q.setStatus("RESPONDED");
        return queryRepo.save(q);
    }

    public void assignProjects(Long managerId, List<Long> projectIds) {
        // intentionally left empty (future logic)
    }
}
