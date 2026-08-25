import mongoose from "mongoose";

import AIChat from "../models/aiChat.model.js";

import { generateAIResponse } from "../services/ai.service.js";

// ==========================================
// CHAT WITH AI
// ==========================================

export const chatWithAI = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    // ----------------------------------------
    // Validate message
    // ----------------------------------------

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const userMessage = message.trim();

    // ----------------------------------------
    // Validate chatId if provided
    // ----------------------------------------

    if (chatId && !mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID.",
      });
    }

    // ========================================
    // GUEST USER
    // ========================================

    if (!req.user?._id) {
      const aiResponse = await generateAIResponse(userMessage);

      return res.status(200).json({
        success: true,
        message: aiResponse,
        chatId: null,
      });
    }

    // ========================================
    // LOGGED-IN USER
    // ========================================

    let chat;

    // ----------------------------------------
    // Existing chat
    // ----------------------------------------

    if (chatId) {
      chat = await AIChat.findOne({
        _id: chatId,
        user: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found.",
        });
      }
    }

    // ----------------------------------------
    // Create new chat
    // ----------------------------------------

    if (!chat) {
      chat = new AIChat({
        user: req.user._id,
        messages: [],
      });
    }

    // ----------------------------------------
    // Previous messages
    // ----------------------------------------

    const previousMessages = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // ----------------------------------------
    // Generate AI response
    // ----------------------------------------

    const aiResponse = await generateAIResponse(userMessage, previousMessages);

    // ----------------------------------------
    // Save user message
    // ----------------------------------------

    chat.messages.push({
      role: "user",
      content: userMessage,
    });

    // ----------------------------------------
    // Save AI response
    // ----------------------------------------

    chat.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    // ----------------------------------------
    // Save chat
    // ----------------------------------------

    await chat.save();

    return res.status(200).json({
      success: true,
      message: aiResponse,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating AI response.",
    });
  }
};

// ==========================================
// GET ALL AI CHATS
// ==========================================

export const getAIChats = async (req, res) => {
  try {
    const chats = await AIChat.find({
      user: req.user._id,
    })
      .select("_id messages createdAt updatedAt")
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error("Get AI Chats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching AI chats.",
    });
  }
};

// ==========================================
// GET SINGLE AI CHAT
// ==========================================

export const getAIChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID.",
      });
    }

    const chat = await AIChat.findOne({
      _id: chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Get AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the chat.",
    });
  }
};

// ==========================================
// DELETE AI CHAT
// ==========================================

export const deleteAIChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID.",
      });
    }

    const chat = await AIChat.findOneAndDelete({
      _id: chatId,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error("Delete AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the chat.",
    });
  }
};
