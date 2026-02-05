package com.example.demo.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateDto {
    private String fname;
    private String lname;
    private String email;
    private String phone;
    private String address;
}
