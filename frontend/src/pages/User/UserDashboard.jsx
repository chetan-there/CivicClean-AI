import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import complaintService from "../../services/complaintService";
import "./UserDashboard.css";

function UserDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id || 1;
        const response = await complaintService.getUserComplaints(userId);
        if (response.success) {
          const data = response.data;
          setStats({
            total: data.length,
            resolved: data.filter((c) => c.status === "RESOLVED").length,
            pending: data.filter((c) => c.status === "PENDING").length,
          });
          setRecentComplaints(data.slice(0, 5));
        }
      } catch (err) {
        console.log("Using sample data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">🌍 Smart Waste</div>
        <div className="navbar-user">
          <span>👤 {user?.firstName || "User"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-text">
          Good Morning, {user?.firstName || "User"}! 👋
        </div>
        <div className="welcome-sub">
          Here's what's happening with your waste reports today.
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{stats.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🪙</div>
            <div className="stat-number">{user?.rewardPoints || 0}</div>
            <div className="stat-label">Reward Points</div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="section-title">Quick Actions</div>
        <div className="actions-grid">
          <Link to="/report" className="action-card">
            <div className="action-icon">📸</div>
            <div className="action-title">Report Waste</div>
            <div className="action-desc">Upload image & location</div>
          </Link>
          <Link to="/status" className="action-card">
            <div className="action-icon">🔍</div>
            <div className="action-title">Track Complaints</div>
            <div className="action-desc">View your report status</div>
          </Link>
          <div className="action-card">
            <div className="action-icon">🪙</div>
            <div className="action-title">My Rewards</div>
            <div className="action-desc">
              {user?.rewardPoints || 0} points earned
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">👤</div>
            <div className="action-title">My Profile</div>
            <div className="action-desc">Manage your account</div>
          </div>
        </div>

        {/* RECENT COMPLAINTS */}
        <div className="section-title">Recent Complaints</div>
        <div className="complaints-table">
          <div className="table-scroll">
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#888",
                }}
              >
                ⏳ Loading...
              </div>
            ) : recentComplaints.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#888",
                }}
              >
                📭 No complaints yet.{" "}
                <Link to="/report" style={{ color: "#1a936f" }}>
                  Report your first one!
                </Link>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Waste Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.location}</td>
                      <td>{c.wasteType}</td>
                      <td>{c.createdAt?.split("T")[0] || c.createdAt}</td>
                      <td>
                        <span className={getStatusClass(c.status)}>
                          {getStatusLabel(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
