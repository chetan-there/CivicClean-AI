import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import complaintService from "../../services/complaintService";
import teamService from "../../services/teamService";
import "./AdminDashboard.css";

const wasteTypes = [
  { type: "🧴 Plastic", pct: 40 },
  { type: "🍃 Organic", pct: 28 },
  { type: "♻️ Mixed", pct: 18 },
  { type: "💻 Electronic", pct: 9 },
  { type: "🏥 Medical", pct: 5 },
];

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    highSeverity: 0,
  });
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [complaintsRes, statsRes, teamsRes] = await Promise.all([
        complaintService.getAllComplaints(),
        complaintService.getStats(),
        teamService.getAllTeams(),
      ]);
      if (complaintsRes.success) setComplaints(complaintsRes.data.slice(0, 5));
      if (statsRes.success) setStats(statsRes.data);
      if (teamsRes.success) setTeams(teamsRes.data);
    } catch (err) {
      console.log("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (id) => {
    try {
      await complaintService.updateStatus(id, "IN_PROGRESS", null, null);
      fetchDashboardData();
    } catch (err) {
      console.log("Error assigning:", err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await complaintService.updateStatus(id, "RESOLVED", null, null);
      fetchDashboardData();
    } catch (err) {
      console.log("Error resolving:", err);
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

  const getSeverityClass = (severity) => {
    if (severity === "HIGH") return "severity-high";
    if (severity === "MEDIUM") return "severity-medium";
    return "severity-low";
  };

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "📋", label: "Complaints" },
    { icon: "👥", label: "Teams" },
    { icon: "📊", label: "Reports" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="admin-container">
      {/* NAVBAR */}
      <nav className="admin-navbar">
        <div className="admin-navbar-brand">
          🌍 Smart Waste
          <span className="admin-badge">ADMIN</span>
        </div>
        <div className="admin-navbar-right">
          <span>👤 {user?.firstName || "Admin"}</span>
          <button
            className="admin-logout-btn"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="sidebar-title">Main Menu</div>
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`sidebar-item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveMenu(item.label);
                if (item.label === "Complaints") {
                  navigate("/admin/complaints");
                }
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-main">
          <div className="admin-welcome">
            Welcome, {user?.firstName || "Admin"}! 👋
          </div>
          <div className="admin-sub">
            Municipality Waste Management Control Panel
          </div>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                color: "#888",
              }}
            >
              ⏳ Loading dashboard...
            </div>
          ) : (
            <>
              {/* STATS */}
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <div className="stat-icon-box bg-blue">📋</div>
                  <div className="stat-info">
                    <div>{stats.total || 0}</div>
                    <div>Total</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon-box bg-yellow">⏳</div>
                  <div className="stat-info">
                    <div>{stats.pending || 0}</div>
                    <div>Pending</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon-box bg-purple">🔄</div>
                  <div className="stat-info">
                    <div>{stats.inProgress || 0}</div>
                    <div>In Progress</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon-box bg-green">✅</div>
                  <div className="stat-info">
                    <div>{stats.resolved || 0}</div>
                    <div>Resolved</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon-box bg-red">🚨</div>
                  <div className="stat-info">
                    <div>{stats.highSeverity || 0}</div>
                    <div>High</div>
                  </div>
                </div>
              </div>

              {/* COMPLAINTS TABLE */}
              <div className="section-header">
                <div className="section-title">📋 Recent Complaints</div>
                <Link to="/admin/complaints" className="view-all-btn">
                  View All →
                </Link>
              </div>

              <div className="admin-table-card">
                <div className="table-scroll">
                  {complaints.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#888",
                      }}
                    >
                      📭 No complaints yet
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Citizen</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>Severity</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints.map((c) => (
                          <tr key={c.id}>
                            <td>
                              <strong>{c.complaintCode}</strong>
                            </td>
                            <td>{c.userName}</td>
                            <td>{c.location}</td>
                            <td>{c.wasteType}</td>
                            <td className={getSeverityClass(c.severity)}>
                              {c.severity}
                            </td>
                            <td>
                              <span className={getStatusClass(c.status)}>
                                {getStatusLabel(c.status)}
                              </span>
                            </td>
                            <td>
                              {c.status === "PENDING" && (
                                <button
                                  className="action-btn btn-assign"
                                  onClick={() => handleAssign(c.id)}
                                >
                                  Assign
                                </button>
                              )}
                              {c.status === "IN_PROGRESS" && (
                                <button
                                  className="action-btn btn-resolve"
                                  onClick={() => handleResolve(c.id)}
                                >
                                  Resolve
                                </button>
                              )}
                              {c.status === "RESOLVED" && (
                                <span
                                  style={{
                                    color: "#888",
                                    fontSize: "12px",
                                  }}
                                >
                                  ✅ Done
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* BOTTOM GRID */}
              <div className="admin-bottom-grid">
                {/* WASTE TYPE BREAKDOWN */}
                <div className="info-card">
                  <h3>♻️ Waste Type Breakdown</h3>
                  {wasteTypes.map((w) => (
                    <div key={w.type} className="waste-type-row">
                      <span className="waste-type-label">{w.type}</span>
                      <div className="waste-bar-wrap">
                        <div
                          className="waste-bar"
                          style={{ width: `${w.pct}%` }}
                        />
                      </div>
                      <span className="waste-pct">{w.pct}%</span>
                    </div>
                  ))}
                </div>

                {/* CLEANUP TEAMS */}
                <div className="info-card">
                  <h3>👥 Cleanup Teams</h3>
                  {teams.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#888",
                        fontSize: "14px",
                      }}
                    >
                      No teams added yet.
                    </div>
                  ) : (
                    teams.map((t) => (
                      <div key={t.id} className="team-row">
                        <div>
                          <div
                            style={{
                              fontWeight: "600",
                              fontSize: "14px",
                            }}
                          >
                            {t.teamName}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#888",
                            }}
                          >
                            {t.area}
                          </div>
                        </div>
                        <span
                          className={`team-status ${
                            t.status === "AVAILABLE"
                              ? "team-active"
                              : "team-busy"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
