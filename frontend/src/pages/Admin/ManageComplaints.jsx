import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import complaintService from "../../services/complaintService";
import "./ManageComplaints.css";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalData, setModalData] = useState({ status: "", note: "" });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getAllComplaints();
      if (response.success) setComplaints(response.data);
    } catch (err) {
      console.log("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = complaints.filter((c) => {
    const matchSearch =
      c.complaintCode?.toLowerCase().includes(search.toLowerCase()) ||
      c.userName?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    const matchSeverity =
      filterSeverity === "All" || c.severity === filterSeverity;
    const matchType = filterType === "All" || c.wasteType === filterType;
    return matchSearch && matchStatus && matchSeverity && matchType;
  });

  const handleReset = () => {
    setSearch("");
    setFilterStatus("All");
    setFilterSeverity("All");
    setFilterType("All");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await complaintService.deleteComplaint(id);
        fetchComplaints();
      } catch (err) {
        console.log("Error deleting:", err);
      }
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalData({ status: complaint.status, note: "" });
  };

  const handleModalSave = async () => {
    try {
      await complaintService.updateStatus(
        selectedComplaint.id,
        modalData.status,
        modalData.note,
        null,
      );
      setSelectedComplaint(null);
      fetchComplaints();
    } catch (err) {
      console.log("Error updating:", err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "RESOLVED") return "status-badge status-resolved";
    if (status === "IN_PROGRESS") return "status-badge status-progress";
    return "status-badge status-pending";
  };

  const getStatusLabel = (status) => {
    if (status === "IN_PROGRESS") return "In Progress";
    if (status === "RESOLVED") return "Resolved";
    return "Pending";
  };

  const getSeverityClass = (s) => {
    if (s === "HIGH") return "severity-high";
    if (s === "MEDIUM") return "severity-medium";
    return "severity-low";
  };

  return (
    <div className="manage-container">
      {/* NAVBAR */}
      <nav
        style={{
          background: "linear-gradient(135deg, #114b5f, #0a2e3d)",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px", fontWeight: "700" }}>
            🌍 Smart Waste
          </span>
          <span
            style={{
              background: "#1a936f",
              color: "white",
              padding: "2px 8px",
              borderRadius: "20px",
              fontSize: "10px",
              fontWeight: "700",
            }}
          >
            ADMIN
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            fontSize: "13px",
          }}
        >
          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            ← Dashboard
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="manage-content">
        <div className="page-header">
          <h2>📋 Manage Complaints</h2>
          <p>Search, filter and update all citizen waste reports</p>
        </div>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="mini-stat">
            <div className="mini-stat-number">{complaints.length}</div>
            <div className="mini-stat-label">Total</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-number">
              {complaints.filter((c) => c.status === "PENDING").length}
            </div>
            <div className="mini-stat-label">⏳ Pending</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-number">
              {complaints.filter((c) => c.status === "IN_PROGRESS").length}
            </div>
            <div className="mini-stat-label">🔄 Progress</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-number">
              {complaints.filter((c) => c.status === "RESOLVED").length}
            </div>
            <div className="mini-stat-label">✅ Resolved</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-number">
              {complaints.filter((c) => c.severity === "HIGH").length}
            </div>
            <div className="mini-stat-label">🚨 High</div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters-bar">
          <div className="filter-group">
            <label>🔍 Search</label>
            <input
              type="text"
              placeholder="Code, name, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="PLASTIC">Plastic</option>
              <option value="ORGANIC">Organic</option>
              <option value="MIXED">Mixed</option>
              <option value="ELECTRONIC">Electronic</option>
              <option value="MEDICAL">Medical</option>
            </select>
          </div>
          <button className="reset-btn" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <div className="table-header">
            <h3>Complaints List</h3>
            <span className="result-count">
              Showing {filtered.length} of {complaints.length}
            </span>
          </div>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                color: "#888",
              }}
            >
              ⏳ Loading complaints...
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div>📭</div>
              <p>No complaints match your filters</p>
            </div>
          ) : (
            <div className="table-scroll">
              <table className="manage-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Citizen</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong>{c.complaintCode}</strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: "600" }}>{c.userName}</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>
                          {c.userEmail}
                        </div>
                      </td>
                      <td>{c.location}</td>
                      <td>{c.wasteType}</td>
                      <td className={getSeverityClass(c.severity)}>
                        {c.severity}
                      </td>
                      <td>{c.createdAt?.split("T")[0] || c.createdAt}</td>
                      <td>
                        <span className={getStatusClass(c.status)}>
                          {getStatusLabel(c.status)}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button
                            className="action-btn btn-assign"
                            onClick={() => openModal(c)}
                          >
                            ✏️ Update
                          </button>
                          <button
                            className="action-btn btn-delete"
                            onClick={() => handleDelete(c.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* UPDATE MODAL */}
      {selectedComplaint && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ Update {selectedComplaint.complaintCode}</h3>

            <div
              style={{
                background: "#f0f4f8",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}
              >
                📍 {selectedComplaint.location}
              </div>
              <div
                style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}
              >
                👤 {selectedComplaint.userName}
              </div>
              <div style={{ fontSize: "13px", color: "#777" }}>
                {selectedComplaint.description}
              </div>
            </div>

            <div className="modal-field">
              <label>Update Status</label>
              <select
                value={modalData.status}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    status: e.target.value,
                  })
                }
              >
                <option value="PENDING">⏳ Pending</option>
                <option value="IN_PROGRESS">🔄 In Progress</option>
                <option value="RESOLVED">✅ Resolved</option>
              </select>
            </div>

            <div className="modal-field">
              <label>Admin Note (Optional)</label>
              <textarea
                placeholder="Add a note..."
                value={modalData.note}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    note: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                Cancel
              </button>
              <button className="modal-save-btn" onClick={handleModalSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageComplaints;
