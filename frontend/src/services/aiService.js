const AI_BASE_URL = "http://localhost:5000";

const aiService = {
  classifyImage: async (imageFile) => {
    try {
      console.log("Sending image to AI:", imageFile.name);

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${AI_BASE_URL}/classify`, {
        method: "POST",
        body: formData,
      });

      console.log("AI HTTP status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("AI error response:", errorText);
        return { success: false, error: `HTTP ${response.status}` };
      }

      const data = await response.json();
      console.log("AI response data:", data);
      return data;
    } catch (err) {
      console.log("AI service network error:", err.message);
      return {
        success: false,
        error: err.message,
      };
    }
  },

  checkHealth: async () => {
    try {
      const response = await fetch(`${AI_BASE_URL}/health`);
      const data = await response.json();
      return { online: true, ...data };
    } catch (err) {
      return { online: false };
    }
  },
};

export default aiService;
