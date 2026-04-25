import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import UserDashboard from "./pages/User/UserDashboard";
import ReportWaste from "./pages/User/ReportWaste";
import ComplaintStatus from "./pages/User/ComplaintStatus";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageComplaints from "./pages/Admin/ManageComplaints";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportWaste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <ComplaintStatus />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageComplaints />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
