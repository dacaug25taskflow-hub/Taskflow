package com.example.demo.dto;

public class ProjectDashboardDto {

    private long totalTasks;
    private long completed;
    private long inProgress;
    private long pending;
    private long highPriority;

    public ProjectDashboardDto(long totalTasks, long completed,
                               long inProgress, long pending,
                               long highPriority) {
        this.totalTasks = totalTasks;
        this.completed = completed;
        this.inProgress = inProgress;
        this.pending = pending;
        this.highPriority = highPriority;
    }

    public long getTotalTasks() { return totalTasks; }
    public long getCompleted() { return completed; }
    public long getInProgress() { return inProgress; }
    public long getPending() { return pending; }
    public long getHighPriority() { return highPriority; }
}
