package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectWithManagerDto {
    private Long pid;
    private String pname;
    private String pdescription;
    private Long managerId;
    private String managerName;
}
