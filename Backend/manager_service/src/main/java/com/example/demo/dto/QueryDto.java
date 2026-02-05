package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QueryDto {
    private Long qid;
    private String query;
    private String qname;
    private Long teamidFk;
    private Long fkPid;
    private Long mgruid;
    private String response;
    private String status;
    private Long raisedByUid;
    private String raisedByName;
    private String teamLeaderName;
    private String projectName;
    private String source;  // "TEAM_LEADER" or "EMPLOYEE"
    private String respondedByName;
}
