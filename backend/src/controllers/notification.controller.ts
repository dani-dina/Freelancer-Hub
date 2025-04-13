import { Request, Response } from "express";
import { Notification } from "../models/notification.model";
import { HTTP_STATUS } from "../constants/status";

// Get notifications for a user
const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({ _id: -1 });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Create a new notification
const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, type, message } = req.body;

    const newNotification = new Notification({
      userId,
      type,
      message,
    });

    await newNotification.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Notification created",
      data: newNotification,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create notification",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updated) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Notification marked as read",
      data: updated,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update notification",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a notification
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete notification",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
};
