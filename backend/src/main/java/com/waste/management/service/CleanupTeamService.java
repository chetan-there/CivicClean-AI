package com.waste.management.service;

import com.waste.management.model.CleanupTeam;
import com.waste.management.repository.CleanupTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CleanupTeamService {

    private final CleanupTeamRepository cleanupTeamRepository;

    public CleanupTeam addTeam(CleanupTeam team) {
        return cleanupTeamRepository.save(team);
    }

    public List<CleanupTeam> getAllTeams() {
        return cleanupTeamRepository.findAll();
    }

    public List<CleanupTeam> getAvailableTeams() {
        return cleanupTeamRepository
                .findByStatus(CleanupTeam.TeamStatus.AVAILABLE);
    }

    public CleanupTeam updateTeamStatus(Long id, String status) {
        CleanupTeam team = cleanupTeamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        team.setStatus(CleanupTeam.TeamStatus.valueOf(status.toUpperCase()));
        return cleanupTeamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        cleanupTeamRepository.deleteById(id);
    }
}