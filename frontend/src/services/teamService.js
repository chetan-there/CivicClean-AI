import API from "./api";

const teamService = {
  getAllTeams: async () => {
    const response = await API.get("/teams");
    return response.data;
  },

  getAvailableTeams: async () => {
    const response = await API.get("/teams/available");
    return response.data;
  },

  addTeam: async (team) => {
    const response = await API.post("/teams", team);
    return response.data;
  },

  updateTeamStatus: async (id, status) => {
    const response = await API.put(`/teams/${id}/status?status=${status}`);
    return response.data;
  },

  deleteTeam: async (id) => {
    const response = await API.delete(`/teams/${id}`);
    return response.data;
  },
};

export default teamService;
