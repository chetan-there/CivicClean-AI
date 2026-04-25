package com.waste.management.service;

import com.waste.management.dto.*;
import com.waste.management.exception.BadRequestException;
import com.waste.management.exception.ResourceNotFoundException;
import com.waste.management.exception.UnauthorizedException;
import com.waste.management.model.User;
import com.waste.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(
                    "Email already registered: " + request.getEmail()
            );
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(
                "ADMIN".equals(request.getRole())
                        ? User.Role.ADMIN
                        : User.Role.USER
        );
        user.setRewardPoints(0);

        User saved = userRepository.save(user);

        return new AuthResponse(
                saved.getId(),
                null,
                saved.getEmail(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getRole().name(),
                saved.getRewardPoints(),
                "Registration successful"
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User", "email", request.getEmail()
                ));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPassword()
        )) {
            throw new UnauthorizedException("Invalid password");
        }

        if (!user.getIsActive()) {
            throw new UnauthorizedException("Account is deactivated");
        }

        return new AuthResponse(
                user.getId(),
                "jwt-token-placeholder",
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name(),
                user.getRewardPoints(),
                "Login successful"
        );
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User", "id", id
                ));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User", "email", email
                ));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllCitizens() {
        return userRepository.findByRole(User.Role.USER);
    }

    public User updateRewardPoints(Long userId, Integer points) {
        User user = getUserById(userId);
        user.setRewardPoints(user.getRewardPoints() + points);
        return userRepository.save(user);
    }

    public void deactivateUser(Long userId) {
        User user = getUserById(userId);
        user.setIsActive(false);
        userRepository.save(user);
    }

    public Long getTotalCitizens() {
        return userRepository.countTotalCitizens();
    }
}