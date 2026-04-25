package com.waste.management.repository;

import com.waste.management.model.Reward;
import com.waste.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {

    List<Reward> findByUser(User user);

    List<Reward> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT SUM(r.points) FROM Reward r WHERE r.user = :user")
    Integer getTotalPointsByUser(@Param("user") User user);
}