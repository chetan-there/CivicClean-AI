import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import complaintService from "../../services/complaintService";
import "./ReportWaste.css";
import aiService from "../../services/aiService";

function ReportWaste() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [formData, setFormData] = useState({
    wasteType: "",
    severity: "",
    description: "",
    location: "",
    landmark: "",
    latitude: null,
    longitude: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Start AI classification
    setAiLoading(true);
    setAiResult(null);

    try {
      console.log("Starting AI classification...");
      const result = await aiService.classifyImage(file);
      console.log("Full AI result:", result);

      if (result.success && result.data && result.data.isWaste) {
        const wasteType = result.data.wasteType?.toLowerCase();
        const severity = result.data.severity?.toLowerCase();

        console.log("Setting wasteType:", wasteType);
        console.log("Setting severity:", severity);

        const validWasteTypes = [
          "plastic",
          "organic",
          "electronic",
          "medical",
          "construction",
          "mixed",
        ];
        const validSeverities = ["low", "medium", "high"];

        setFormData((prev) => ({
          ...prev,
          wasteType: validWasteTypes.includes(wasteType)
            ? wasteType
            : prev.wasteType,
          severity: validSeverities.includes(severity)
            ? severity
            : prev.severity,
          description: prev.description || result.data.description || "",
        }));

        setAiResult(result.data);
        console.log("Dropdowns should now be filled!");
      } else {
        console.log("AI result not valid:", result);
      }
    } catch (err) {
      console.log("AI error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDetectLocation = () => {
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData({
          ...formData,
          location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`,
          latitude,
          longitude,
        });
        setDetecting(false);
      },
      () => {
        setError("Location access denied. Please enter manually.");
        setDetecting(false);
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userId = user?.id || 1;
      const response = await complaintService.submitComplaint(
        formData,
        imageFile,
        userId,
      );

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => navigate("/dashboard"), 2500);
      } else {
        setError(response.message || "Failed to submit complaint");
      }
    } catch (err) {
      setError("Failed to submit. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
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
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
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

      <div className="report-content">
        <div className="page-header">
          <h2>📸 Report Waste</h2>
          <p>Upload an image and provide details about the waste location</p>
        </div>

        {/* SUCCESS MESSAGE */}
        {submitted && (
          <div className="success-msg">
            ✅ Complaint submitted successfully! Redirecting to dashboard...
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              background: "#fce4ec",
              color: "#b71c1c",
              padding: "12px 16px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            ❌ {error}
          </div>
        )}

        <div className="report-card">
          <form onSubmit={handleSubmit}>
            {/* IMAGE UPLOAD */}
            {!imagePreview ? (
              <div className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="upload-icon">📷</div>
                <h4>Click to upload waste image</h4>
                <p>Supports JPG, PNG, WEBP — Max 5MB</p>
              </div>
            ) : (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
                <div className="form-group">
                  <label>Change Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </>
            )}

            {/* AI RESULT BANNER */}
            {aiLoading && (
              <div
                style={{
                  background: "#e3f2fd",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#1565c0",
                }}
              >
                🤖 AI is analyzing your image...
              </div>
            )}

            {aiResult && !aiLoading && (
              <div
                style={{
                  background: "#e8f5e9",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#2e7d32",
                  border: "1px solid #a5d6a7",
                }}
              >
                🤖 <strong>AI Detected:</strong> {aiResult.wasteType} waste |
                Severity: {aiResult.severity} | Confidence:{" "}
                {Math.round(aiResult.confidence * 100)}%
                <div style={{ marginTop: "4px", color: "#555" }}>
                  💡 {aiResult.suggestions}
                </div>
              </div>
            )}

            {/* WASTE TYPE & SEVERITY */}
            <div className="form-row">
              <div className="form-group">
                <label>Waste Type</label>
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="plastic">🧴 Plastic</option>
                  <option value="organic">🍃 Organic</option>
                  <option value="electronic">💻 Electronic</option>
                  <option value="medical">🏥 Medical</option>
                  <option value="construction">🧱 Construction</option>
                  <option value="mixed">♻️ Mixed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Severity Level</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select severity</option>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-group">
              <label>📍 Location</label>
              <div className="location-box">
                <input
                  type="text"
                  name="location"
                  placeholder="Click detect or enter manually"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="detect-btn"
                  onClick={handleDetectLocation}
                  disabled={detecting}
                >
                  {detecting ? "..." : "📍 Detect"}
                </button>
              </div>
            </div>

            {/* LANDMARK */}
            <div className="form-group">
              <label>Nearest Landmark</label>
              <input
                type="text"
                name="landmark"
                placeholder="e.g. Near City Mall, Opposite Bus Stop"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe the waste situation..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "⏳ Submitting..." : "🚀 Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportWaste;
