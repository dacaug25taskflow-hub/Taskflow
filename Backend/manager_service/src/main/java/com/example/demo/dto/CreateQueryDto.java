package com.example.demo.dto;

public class CreateQueryDto {

    private String query;
    private Long teamIdFk;
    private Long projectId;
    private Long managerUid;

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public Long getTeamIdFk() { return teamIdFk; }
    public void setTeamIdFk(Long teamIdFk) { this.teamIdFk = teamIdFk; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getManagerUid() { return managerUid; }
    public void setManagerUid(Long managerUid) { this.managerUid = managerUid; }
}
