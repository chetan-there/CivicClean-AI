package com.waste.management.repository;

import com.waste.management.model.CleanupTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CleanupTeamRepository extends JpaRepository<CleanupTeam, Long> {

    List<CleanupTeam> findByStatus(CleanupTeam.TeamStatus status);

    List<CleanupTeam> findByArea(String area);
}