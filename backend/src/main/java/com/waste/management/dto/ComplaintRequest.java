package com.waste.management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequest {

    @NotBlank(message = "Location is required")
    private String location;

    private String landmark;

    private Double latitude;

    private Double longitude;

    @NotBlank(message = "Waste type is required")
    private String wasteType;

    @NotBlank(message = "Severity is required")
    private String severity;

    private String description;
}