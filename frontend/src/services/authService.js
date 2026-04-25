import API from "./api";

const authService = {
  register: async (formData) => {
    const response = await API.post("/auth/register", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
    });
    return response.data;
  },

  login: async (formData) => {
    const response = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    // Save user to localStorage
    if (response.data.success) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user") || "null");
  },

  isLoggedIn: () => {
    return !!localStorage.getItem("user");
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.role === "ADMIN";
  },
};

export default authService;
