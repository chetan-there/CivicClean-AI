import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import complaintService from "../../services/complaintService";
import "./ComplaintStatus.css";

function ComplaintStatus() {
  const [complaints, setComplaints] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const filters = ["All", "PENDING", "IN_PROGRESS", "RESOLVED"];

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const userId = user?.id || 1;
      const response = await complaintService.getUserComplaints(userId);
      if (response.success) {
        setComplaints(response.data);
      } else {
        setError("Failed to load complaints");
      }
    } catch (err) {
      setError("Could not connect to server. Showing sample data.");
      // Fallback sample data
      setComplaints([
        {
          id: 1,
          complaintCode: "WMS-001",
          location: "MG Road, Nagpur",
          wasteType: "PLASTIC",
          severity: "HIGH",
          createdAt: "2024-01-20",
          status: "RESOLVED",
          description: "Large pile of plastic waste near bus stop.",
        },
        {
          id: 2,
          complaintCode: "WMS-002",
          location: "Sitabuldi, Nagpur",
          wasteType: "ORGANIC",
          severity: "MEDIUM",
          createdAt: "2024-01-18",
          status: "IN_PROGRESS",
          description: "Rotting organic waste causing bad smell.",
        },
        {
          id: 3,
          complaintCode: "WMS-003",
          location: "Dharampeth, Nagpur",
          wasteType: "MIXED",
          severity: "LOW",
          createdAt: "2024-01-15",
          status: "PENDING",
          description: "Mixed garbage dumped on the roadside.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    activeFilter === "All"
      ? complaints
      : complaints.filter((c) => c.status === activeFilter);

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

  const getWasteEmoji = (type) => {
    const emojis = {
      PLASTIC: "🧴",
      ORGANIC: "🍃",
      ELECTRONIC: "💻",
      MEDICAL: "🏥",
      CONSTRUCTION: "🧱",
      MIXED: "♻️",
    };
    return emojis[type] || "🗑️";
  };

  return (
    <div className="status-container">
      {/* NAVBAR */}
      <nav
        style={{
          background: "linear-gradient(135deg, #1a936f, #114b5f)",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "700" }}>
          🌍 Smart Waste Management
        </div>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="status-content">
        <div className="page-header">
          <h2>🔍 My Complaints</h2>
          <p>Track and monitor all your submitted waste reports</p>
        </div>

        {/* ERROR BANNER */}
        {error && (
          <div
            style={{
              background: "#fff3cd",
              color: "#856404",
              padding: "12px 16px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "#888",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
            <p>Loading your complaints...</p>
          </div>
        ) : (
          <>
            {/* SUMMARY BAR */}
            <div className="summary-bar">
              <div className="summary-item">
                <div className="summary-icon">📋</div>
                <div className="summary-info">
                  <div>{complaints.length}</div>
                  <div>Total Reports</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">✅</div>
                <div className="summary-info">
                  <div>
                    {complaints.filter((c) => c.status === "RESOLVED").length}
                  </div>
                  <div>Resolved</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">⏳</div>
                <div className="summary-info">
                  <div>
                    {complaints.filter((c) => c.status === "PENDING").length}
                  </div>
                  <div>Pending</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">🔄</div>
                <div className="summary-info">
                  <div>
                    {
                      complaints.filter((c) => c.status === "IN_PROGRESS")
                        .length
                    }
                  </div>
                  <div>In Progress</div>
                </div>
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="filter-tabs">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`tab-btn ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f === "IN_PROGRESS" ? "In Progress" : f}
                </button>
              ))}
            </div>

            {/* COMPLAINTS LIST */}
            <div className="complaints-list">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div>📭</div>
                  <p>No complaints found for this filter</p>
                </div>
              ) : (
                filtered.map((c) => (
                  <div key={c.id} className="complaint-card">
                    <div className="complaint-img">
                      {getWasteEmoji(c.wasteType)}
                    </div>

                    <div className="complaint-info">
                      <h4>📍 {c.location}</h4>
                      <div className="complaint-meta">
                        <span className="meta-item">🗂️ {c.wasteType}</span>
                        <span className="meta-item">⚠️ {c.severity}</span>
                        <span className="meta-item">
                          📅 {c.createdAt?.split("T")[0] || c.createdAt}
                        </span>
                      </div>
                      <div className="complaint-desc">{c.description}</div>
                      {c.adminNote && (
                        <div
                          style={{
                            marginTop: "6px",
                            fontSize: "13px",
                            color: "#1a936f",
                            fontWeight: "600",
                          }}
                        >
                          💬 Admin: {c.adminNote}
                        </div>
                      )}
                    </div>

                    <div className="status-section">
                      <div className={getStatusClass(c.status)}>
                        {getStatusLabel(c.status)}
                      </div>
                      <div className="complaint-id">{c.complaintCode}</div>
                      {c.status === "RESOLVED" && (
                        <div className="points-earned">+20 pts 🪙</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ComplaintStatus;
