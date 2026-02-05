package com.example.demo.admin.dto;

public class AdminDashboardCountsDto {

    private long totalUsers;
    private long managers;
    private long teamLeaders;
    private long employees;

    public AdminDashboardCountsDto(long totalUsers, long managers, long teamLeaders, long employees) {
        this.totalUsers = totalUsers;
        this.managers = managers;
        this.teamLeaders = teamLeaders;
        this.employees = employees;
    }

    public long getTotalUsers() { return totalUsers; }
    public long getManagers() { return managers; }
    public long getTeamLeaders() { return teamLeaders; }
    public long getEmployees() { return employees; }
}
