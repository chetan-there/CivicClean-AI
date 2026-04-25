package com.waste.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String complaintCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    private String location;

    private String landmark;

    private Double latitude;

    private Double longitude;

    @Enumerated(EnumType.STRING)
    private WasteType wasteType;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private String adminNote;

    private String assignedTeam;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime resolvedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.complaintCode = "WMS-" + System.currentTimeMillis();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (this.status == Status.RESOLVED) {
            this.resolvedAt = LocalDateTime.now();
        }
    }

    public enum WasteType {
        PLASTIC, ORGANIC, ELECTRONIC,
        MEDICAL, CONSTRUCTION, MIXED
    }

    public enum Severity {
        LOW, MEDIUM, HIGH
    }

    public enum Status {
        PENDING, IN_PROGRESS, RESOLVED
    }
}