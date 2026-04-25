package com.waste.management.controller;

import com.waste.management.dto.ApiResponse;
import com.waste.management.model.CleanupTeam;
import com.waste.management.service.CleanupTeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CleanupTeamController {

    private final CleanupTeamService cleanupTeamService;

    // ADD TEAM
    @PostMapping
    public ResponseEntity<ApiResponse<CleanupTeam>> addTeam(
            @RequestBody CleanupTeam team
    ) {
        try {
            CleanupTeam saved = cleanupTeamService.addTeam(team);
            return ResponseEntity.ok(
                    ApiResponse.success("Team added", saved)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET ALL TEAMS
    @GetMapping
    public ResponseEntity<ApiResponse<List<CleanupTeam>>> getAllTeams() {
        try {
            List<CleanupTeam> teams = cleanupTeamService.getAllTeams();
            return ResponseEntity.ok(
                    ApiResponse.success("Teams fetched", teams)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET AVAILABLE TEAMS
    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<CleanupTeam>>> getAvailableTeams() {
        try {
            List<CleanupTeam> teams = cleanupTeamService.getAvailableTeams();
            return ResponseEntity.ok(
                    ApiResponse.success("Available teams fetched", teams)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // UPDATE TEAM STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<CleanupTeam>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        try {
            CleanupTeam team = cleanupTeamService.updateTeamStatus(id, status);
            return ResponseEntity.ok(
                    ApiResponse.success("Team status updated", team)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // DELETE TEAM
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTeam(
            @PathVariable Long id
    ) {
        try {
            cleanupTeamService.deleteTeam(id);
            return ResponseEntity.ok(
                    ApiResponse.success("Team deleted", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }
}