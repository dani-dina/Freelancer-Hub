import { Request, Response } from "express";
import { Subscription } from "../models/subscription.model";
import { HTTP_STATUS } from "../constants/status";

// Create a new subscription
const createSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, plan, startDate, endDate, status } = req.body;

    const newSubscription = new Subscription({
      userId,
      plan,
      startDate,
      endDate,
      status,
    });

    await newSubscription.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Subscription created successfully",
      data: newSubscription,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create subscription",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all subscriptions for a user
const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const subscriptions = await Subscription.find({ userId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch subscriptions",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a subscription status (e.g., to "inactive" or "cancelled")
const updateSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSubscription) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Subscription status updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update subscription",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a subscription
const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete subscription",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get active subscriptions for a user
const getActiveSubscriptions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const activeSubscriptions = await Subscription.find({
      userId,
      status: "active",
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Active subscriptions fetched successfully",
      data: activeSubscriptions,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch active subscriptions",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  createSubscription,
  getUserSubscriptions,
  updateSubscriptionStatus,
  deleteSubscription,
  getActiveSubscriptions,
};
