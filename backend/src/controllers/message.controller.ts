import { Request, Response } from "express";
import { Message } from "../models/message.model";
import { HTTP_STATUS } from "../constants/status";

// Get all messages in a conversation
const getMessagesByConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("senderId receiverId")
      .sort({ createdAt: 1 }); // Optional: oldest to newest

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving messages",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Send (create) a new message
const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content, conversationId } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      conversationId,
    });

    await newMessage.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error sending message",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a message by ID
const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting message",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getMessagesByConversation,
  sendMessage,
  deleteMessage,
};
