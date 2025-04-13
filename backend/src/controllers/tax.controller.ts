import { Request, Response } from "express";
import { Tax } from "../models/tax.model";
import { HTTP_STATUS } from "../constants/status";

// Create a new tax entry
const createTax = async (req: Request, res: Response) => {
  try {
    const { userId, amount, taxRate } = req.body;
    const totalTax = (amount * taxRate) / 100;

    const newTax = new Tax({
      userId,
      amount,
      taxRate,
      totalTax,
    });

    await newTax.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Tax entry created successfully",
      data: newTax,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create tax entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all tax entries for a user
const getUserTaxes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const taxes = await Tax.find({ userId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Taxes fetched successfully",
      data: taxes,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch taxes",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a tax entry (e.g., updating the tax rate or amount)
const updateTax = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, taxRate } = req.body;
    const totalTax = (amount * taxRate) / 100;

    const updatedTax = await Tax.findByIdAndUpdate(
      id,
      { amount, taxRate, totalTax },
      { new: true }
    );

    if (!updatedTax) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Tax entry not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Tax entry updated successfully",
      data: updatedTax,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update tax entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a tax entry
const deleteTax = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTax = await Tax.findByIdAndDelete(id);

    if (!deletedTax) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Tax entry not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Tax entry deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete tax entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  createTax,
  getUserTaxes,
  updateTax,
  deleteTax,
};
