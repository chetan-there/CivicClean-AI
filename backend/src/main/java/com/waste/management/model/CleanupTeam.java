package com.waste.management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cleanup_teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CleanupTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String teamName;

    private String area;

    private String supervisorName;

    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private TeamStatus status = TeamStatus.AVAILABLE;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public enum TeamStatus {
        AVAILABLE, BUSY, OFF_DUTY
    }
}