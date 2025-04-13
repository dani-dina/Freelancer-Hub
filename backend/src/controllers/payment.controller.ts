import { Request, Response } from "express";
import { PaymentMethod } from "../models/paymentMethods.model";
import { HTTP_STATUS } from "../constants/status";

// Get all payment methods for a user
const getUserPaymentMethods = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const methods = await PaymentMethod.find({ userId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Payment methods fetched successfully",
      data: methods,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch payment methods",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Add a new payment method
const addPaymentMethod = async (req: Request, res: Response) => {
  try {
    const { userId, type, details } = req.body;

    const newMethod = new PaymentMethod({
      userId,
      type,
      details,
    });

    await newMethod.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Payment method added successfully",
      data: newMethod,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to add payment method",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a payment method
const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await PaymentMethod.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Payment method not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Payment method deleted",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete payment method",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getUserPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
};
