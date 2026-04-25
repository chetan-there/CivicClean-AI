package com.waste.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private Long id;
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Integer rewardPoints;
    private String message;
}