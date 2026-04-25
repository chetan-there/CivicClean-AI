package com.waste.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintResponse {

    private Long id;
    private String complaintCode;
    private String userName;
    private String userEmail;
    private String location;
    private String landmark;
    private Double latitude;
    private Double longitude;
    private String wasteType;
    private String severity;
    private String description;
    private String imageUrl;
    private String status;
    private String adminNote;
    private String assignedTeam;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
}