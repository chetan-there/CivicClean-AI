import API from "./api";

const userService = {
  getAllUsers: async () => {
    const response = await API.get("/users");
    return response.data;
  },

  getUserById: async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },

  getAllCitizens: async () => {
    const response = await API.get("/users/citizens");
    return response.data;
  },

  deactivateUser: async (id) => {
    const response = await API.put(`/users/${id}/deactivate`);
    return response.data;
  },

  getTotalCitizens: async () => {
    const response = await API.get("/users/count");
    return response.data;
  },
};

export default userService;
