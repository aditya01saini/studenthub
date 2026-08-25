import api from "./api";

export const chatWithAI = async (message, chatId = null) => {
  try {
    const response = await api.post("/ai/chat", {
      message,
      ...(chatId && { chatId }),
    });

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAIChats = async () => {
  try {
    const response = await api.get("/ai/chats");

    return response.data;
  } catch (error) {
    console.error("Get AI Chats Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAIChat = async (chatId) => {
  try {
    const response = await api.get(`/ai/chats/${chatId}`);

    return response.data;
  } catch (error) {
    console.error("Get AI Chat Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAIChat = async (chatId) => {
  try {
    const response = await api.delete(`/ai/chats/${chatId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Delete AI Chat Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
