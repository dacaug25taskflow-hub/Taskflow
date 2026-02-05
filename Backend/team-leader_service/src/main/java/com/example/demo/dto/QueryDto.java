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
    private Long teamIdFk;
    private Long projectId;
    private Long managerUid;
    private String response;
    private String status;
    private Long raisedByUid;
    private String raisedByName;
}
