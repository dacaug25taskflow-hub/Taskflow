package com.example.demo.dto;

public class ManagerDashboardDTO {

    private Long totalProjects;
    private Long totalTasks;
    private Long pendingQueries;

    public ManagerDashboardDTO(Long totalProjects, Long totalTasks, Long pendingQueries) {
        this.totalProjects = totalProjects;
        this.totalTasks = totalTasks;
        this.pendingQueries = pendingQueries;
    }

    public Long getTotalProjects() { return totalProjects; }
    public Long getTotalTasks() { return totalTasks; }
    public Long getPendingQueries() { return pendingQueries; }
}
