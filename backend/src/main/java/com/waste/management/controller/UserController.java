package com.waste.management.controller;

import com.waste.management.dto.ApiResponse;
import com.waste.management.model.User;
import com.waste.management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    // GET ALL USERS (Admin)
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(
                    ApiResponse.success("Users fetched", users)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(
            @PathVariable Long id
    ) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(
                    ApiResponse.success("User fetched", user)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET ALL CITIZENS
    @GetMapping("/citizens")
    public ResponseEntity<ApiResponse<List<User>>> getAllCitizens() {
        try {
            List<User> citizens = userService.getAllCitizens();
            return ResponseEntity.ok(
                    ApiResponse.success("Citizens fetched", citizens)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // DEACTIVATE USER
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(
            @PathVariable Long id
    ) {
        try {
            userService.deactivateUser(id);
            return ResponseEntity.ok(
                    ApiResponse.success("User deactivated", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET TOTAL CITIZENS COUNT
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> getTotalCitizens() {
        try {
            Long count = userService.getTotalCitizens();
            return ResponseEntity.ok(
                    ApiResponse.success("Count fetched", count)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }
}