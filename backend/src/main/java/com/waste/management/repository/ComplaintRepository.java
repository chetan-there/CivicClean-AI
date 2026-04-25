package com.waste.management.repository;

import com.waste.management.model.Complaint;
import com.waste.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUser(User user);

    List<Complaint> findByStatus(Complaint.Status status);

    List<Complaint> findBySeverity(Complaint.Severity severity);

    List<Complaint> findByWasteType(Complaint.WasteType wasteType);

    Optional<Complaint> findByComplaintCode(String complaintCode);

    List<Complaint> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT c FROM Complaint c ORDER BY c.createdAt DESC")
    List<Complaint> findAllOrderByCreatedAtDesc();

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = :status")
    Long countByStatus(@Param("status") Complaint.Status status);

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.severity = 'HIGH'")
    Long countHighSeverity();

    @Query("SELECT c FROM Complaint c WHERE c.status = 'PENDING' " +
            "ORDER BY c.severity DESC, c.createdAt ASC")
    List<Complaint> findPendingOrderBySeverity();

    @Query("SELECT c FROM Complaint c WHERE " +
            "LOWER(c.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Complaint> searchComplaints(@Param("keyword") String keyword);
}