package com.waste.management.service;

import com.waste.management.dto.ComplaintRequest;
import com.waste.management.dto.ComplaintResponse;
import com.waste.management.exception.BadRequestException;
import com.waste.management.exception.ResourceNotFoundException;
import com.waste.management.model.Complaint;
import com.waste.management.model.User;
import com.waste.management.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserService userService;
    private final RewardService rewardService;

    // SUBMIT COMPLAINT
    public ComplaintResponse submitComplaint(
            ComplaintRequest request,
            MultipartFile image,
            Long userId
    ) throws IOException {

        User user = userService.getUserById(userId);

        // Validate waste type
        Complaint.WasteType wasteType;
        try {
            wasteType = Complaint.WasteType.valueOf(
                    request.getWasteType().toUpperCase()
            );
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                    "Invalid waste type: " + request.getWasteType()
            );
        }

        // Validate severity
        Complaint.Severity severity;
        try {
            severity = Complaint.Severity.valueOf(
                    request.getSeverity().toUpperCase()
            );
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                    "Invalid severity: " + request.getSeverity()
            );
        }

        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setLocation(request.getLocation());
        complaint.setLandmark(request.getLandmark());
        complaint.setLatitude(request.getLatitude());
        complaint.setLongitude(request.getLongitude());
        complaint.setWasteType(wasteType);
        complaint.setSeverity(severity);
        complaint.setDescription(request.getDescription());
        complaint.setStatus(Complaint.Status.PENDING);

        // Save image if provided
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            complaint.setImageUrl(imageUrl);
        }

        Complaint saved = complaintRepository.save(complaint);

        // Award points for submitting
        rewardService.awardPoints(user, saved, 10, "Complaint submitted");

        return mapToResponse(saved);
    }

    // GET ALL COMPLAINTS
    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAllOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET USER COMPLAINTS
    public List<ComplaintResponse> getUserComplaints(Long userId) {
        User user = userService.getUserById(userId);
        return complaintRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public ComplaintResponse getComplaintById(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Complaint", "id", id
                ));
        return mapToResponse(complaint);
    }

    // GET BY CODE
    public ComplaintResponse getComplaintByCode(String code) {
        Complaint complaint = complaintRepository
                .findByComplaintCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Complaint", "code", code
                ));
        return mapToResponse(complaint);
    }

    // UPDATE STATUS (Admin)
    public ComplaintResponse updateStatus(
            Long id,
            String status,
            String adminNote,
            String assignedTeam
    ) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Complaint", "id", id
                ));

        // Validate status
        Complaint.Status newStatus;
        try {
            newStatus = Complaint.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                    "Invalid status: " + status +
                            ". Must be PENDING, IN_PROGRESS or RESOLVED"
            );
        }

        complaint.setStatus(newStatus);
        if (adminNote != null) complaint.setAdminNote(adminNote);
        if (assignedTeam != null) complaint.setAssignedTeam(assignedTeam);

        Complaint updated = complaintRepository.save(complaint);

        // Award points when resolved
        if (newStatus == Complaint.Status.RESOLVED) {
            rewardService.awardPoints(
                    complaint.getUser(),
                    complaint,
                    20,
                    "Complaint resolved"
            );
        }

        return mapToResponse(updated);
    }

    // DELETE COMPLAINT
    public void deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Complaint", "id", id
            );
        }
        complaintRepository.deleteById(id);
    }

    // SEARCH
    public List<ComplaintResponse> searchComplaints(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new BadRequestException(
                    "Search keyword cannot be empty"
            );
        }
        return complaintRepository.searchComplaints(keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET STATS
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", complaintRepository.count());
        stats.put("pending",
                complaintRepository.countByStatus(Complaint.Status.PENDING));
        stats.put("inProgress",
                complaintRepository.countByStatus(Complaint.Status.IN_PROGRESS));
        stats.put("resolved",
                complaintRepository.countByStatus(Complaint.Status.RESOLVED));
        stats.put("highSeverity",
                complaintRepository.countHighSeverity());
        return stats;
    }

    // SAVE IMAGE TO DISK
    private String saveImage(MultipartFile file) throws IOException {
        String uploadDir = "uploads/complaints/";
        Files.createDirectories(Paths.get(uploadDir));

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new BadRequestException("Invalid image file name");
        }

        // Validate file type
        String extension = originalFilename
                .substring(originalFilename.lastIndexOf("."))
                .toLowerCase();
        if (!List.of(".jpg", ".jpeg", ".png", ".webp").contains(extension)) {
            throw new BadRequestException(
                    "Invalid file type. Only JPG, PNG, WEBP allowed"
            );
        }

        String filename = System.currentTimeMillis() + "_" + originalFilename;
        Path filePath = Paths.get(uploadDir + filename);
        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );
        return "/" + uploadDir + filename;
    }

    // MAP ENTITY TO RESPONSE DTO
    private ComplaintResponse mapToResponse(Complaint c) {
        ComplaintResponse res = new ComplaintResponse();
        res.setId(c.getId());
        res.setComplaintCode(c.getComplaintCode());
        res.setUserName(c.getUser().getFirstName()
                + " " + c.getUser().getLastName());
        res.setUserEmail(c.getUser().getEmail());
        res.setLocation(c.getLocation());
        res.setLandmark(c.getLandmark());
        res.setLatitude(c.getLatitude());
        res.setLongitude(c.getLongitude());
        res.setWasteType(c.getWasteType().name());
        res.setSeverity(c.getSeverity().name());
        res.setDescription(c.getDescription());
        res.setImageUrl(c.getImageUrl());
        res.setStatus(c.getStatus().name());
        res.setAdminNote(c.getAdminNote());
        res.setAssignedTeam(c.getAssignedTeam());
        res.setCreatedAt(c.getCreatedAt());
        res.setUpdatedAt(c.getUpdatedAt());
        res.setResolvedAt(c.getResolvedAt());
        return res;
    }
}