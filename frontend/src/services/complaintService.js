import API from "./api";

const complaintService = {
  // Submit complaint with optional image
  submitComplaint: async (formData, image, userId) => {
    const data = new FormData();
    data.append("location", formData.location);
    data.append("wasteType", formData.wasteType.toUpperCase());
    data.append("severity", formData.severity.toUpperCase());
    data.append("userId", userId);

    if (formData.landmark) data.append("landmark", formData.landmark);
    if (formData.description) data.append("description", formData.description);
    if (formData.latitude) data.append("latitude", formData.latitude);
    if (formData.longitude) data.append("longitude", formData.longitude);

    // Only append image if it actually exists
    if (image && image instanceof File) {
      data.append("image", image);
    }

    const response = await API.post("/complaints", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all complaints (Admin)
  getAllComplaints: async () => {
    const response = await API.get("/complaints");
    return response.data;
  },

  // Get user complaints
  getUserComplaints: async (userId) => {
    const response = await API.get(`/complaints/user/${userId}`);
    return response.data;
  },

  // Get complaint by ID
  getComplaintById: async (id) => {
    const response = await API.get(`/complaints/${id}`);
    return response.data;
  },

  // Get complaint by code
  getComplaintByCode: async (code) => {
    const response = await API.get(`/complaints/code/${code}`);
    return response.data;
  },

  // Update status (Admin)
  updateStatus: async (id, status, adminNote, assignedTeam) => {
    const params = new URLSearchParams();
    params.append("status", status);
    if (adminNote) params.append("adminNote", adminNote);
    if (assignedTeam) params.append("assignedTeam", assignedTeam);

    const response = await API.put(
      `/complaints/${id}/status?${params.toString()}`,
    );
    return response.data;
  },

  // Delete complaint
  deleteComplaint: async (id) => {
    const response = await API.delete(`/complaints/${id}`);
    return response.data;
  },

  // Search complaints
  searchComplaints: async (keyword) => {
    const response = await API.get(`/complaints/search?keyword=${keyword}`);
    return response.data;
  },

  // Get stats
  getStats: async () => {
    const response = await API.get("/complaints/stats");
    return response.data;
  },
};

export default complaintService;
