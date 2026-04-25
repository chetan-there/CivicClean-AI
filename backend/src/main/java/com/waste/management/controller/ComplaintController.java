package com.waste.management.controller;

import com.waste.management.dto.*;
import com.waste.management.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final ComplaintService complaintService;

    // SUBMIT COMPLAINT
    @PostMapping
    public ResponseEntity<ApiResponse<ComplaintResponse>> submitComplaint(
            @RequestParam("location") String location,
            @RequestParam("wasteType") String wasteType,
            @RequestParam("severity") String severity,
            @RequestParam(value = "landmark", required = false) String landmark,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("userId") Long userId
    ) {
        try {
            ComplaintRequest request = new ComplaintRequest();
            request.setLocation(location);
            request.setWasteType(wasteType);
            request.setSeverity(severity);
            request.setLandmark(landmark);
            request.setDescription(description);
            request.setLatitude(latitude);
            request.setLongitude(longitude);

            ComplaintResponse response =
                    complaintService.submitComplaint(request, image, userId);

            return ResponseEntity.ok(
                    ApiResponse.success("Complaint submitted successfully", response)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET ALL COMPLAINTS (Admin)
    @GetMapping
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getAllComplaints() {
        try {
            List<ComplaintResponse> complaints =
                    complaintService.getAllComplaints();
            return ResponseEntity.ok(
                    ApiResponse.success("Complaints fetched", complaints)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET USER COMPLAINTS
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getUserComplaints(
            @PathVariable Long userId
    ) {
        try {
            List<ComplaintResponse> complaints =
                    complaintService.getUserComplaints(userId);
            return ResponseEntity.ok(
                    ApiResponse.success("User complaints fetched", complaints)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ComplaintResponse>> getComplaintById(
            @PathVariable Long id
    ) {
        try {
            ComplaintResponse complaint =
                    complaintService.getComplaintById(id);
            return ResponseEntity.ok(
                    ApiResponse.success("Complaint fetched", complaint)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET BY CODE
    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<ComplaintResponse>> getComplaintByCode(
            @PathVariable String code
    ) {
        try {
            ComplaintResponse complaint =
                    complaintService.getComplaintByCode(code);
            return ResponseEntity.ok(
                    ApiResponse.success("Complaint fetched", complaint)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // UPDATE STATUS (Admin)
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ComplaintResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String adminNote,
            @RequestParam(required = false) String assignedTeam
    ) {
        try {
            ComplaintResponse response =
                    complaintService.updateStatus(
                            id, status, adminNote, assignedTeam
                    );
            return ResponseEntity.ok(
                    ApiResponse.success("Status updated successfully", response)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // DELETE COMPLAINT
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteComplaint(
            @PathVariable Long id
    ) {
        try {
            complaintService.deleteComplaint(id);
            return ResponseEntity.ok(
                    ApiResponse.success("Complaint deleted", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ComplaintResponse>>> search(
            @RequestParam String keyword
    ) {
        try {
            List<ComplaintResponse> results =
                    complaintService.searchComplaints(keyword);
            return ResponseEntity.ok(
                    ApiResponse.success("Search results", results)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }

    // GET STATS
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        try {
            Map<String, Long> stats = complaintService.getStats();
            return ResponseEntity.ok(
                    ApiResponse.success("Stats fetched", stats)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }
}