package com.waste.management.service;

import com.waste.management.model.Complaint;
import com.waste.management.model.Reward;
import com.waste.management.model.User;
import com.waste.management.repository.RewardRepository;
import com.waste.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;

    public Reward awardPoints(
            User user,
            Complaint complaint,
            Integer points,
            String reason
    ) {
        // Save reward record
        Reward reward = new Reward();
        reward.setUser(user);
        reward.setComplaint(complaint);
        reward.setPoints(points);
        reward.setReason(reason);
        reward.setType(Reward.RewardType.COMPLAINT_SUBMITTED);

        rewardRepository.save(reward);

        // Update user total points
        user.setRewardPoints(user.getRewardPoints() + points);
        userRepository.save(user);

        return reward;
    }

    public List<Reward> getUserRewards(User user) {
        return rewardRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Integer getTotalPoints(User user) {
        Integer points = rewardRepository.getTotalPointsByUser(user);
        return points != null ? points : 0;
    }
}