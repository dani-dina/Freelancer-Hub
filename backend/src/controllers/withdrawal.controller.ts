import { Request, Response } from "express";
import { Withdrawal } from "../models/withdrawal.model";

// Create Withdrawal
export const createWithdrawal = async (req: Request, res: Response) => {
  try {
    const { freelancerId, amount, method } = req.body;

    // Create new withdrawal request
    const newWithdrawal = new Withdrawal({
      freelancerId,
      amount,
      method,
      status: "pending",  // Initially set the status to "pending"
    });

    // Save withdrawal
    await newWithdrawal.save();

    return res.status(201).json({ message: "Withdrawal request created successfully", withdrawal: newWithdrawal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Withdrawal Status
export const updateWithdrawalStatus = async (req: Request, res: Response) => {
  try {
    const { withdrawalId } = req.params;
    const { status } = req.body;  // Should be one of ["pending", "processed", "failed"]

    // Validate status
    if (!["pending", "processed", "failed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the withdrawal by ID and update the status
    const updatedWithdrawal = await Withdrawal.findByIdAndUpdate(
      withdrawalId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedWithdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    return res.status(200).json({ message: "Withdrawal status updated successfully", withdrawal: updatedWithdrawal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Withdrawal Details
export const getWithdrawalDetails = async (req: Request, res: Response) => {
  try {
    const { withdrawalId } = req.params;

    // Find the withdrawal by ID
    const withdrawal = await Withdrawal.findById(withdrawalId).populate("freelancerId", "name email");

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    return res.status(200).json({ withdrawal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get All Withdrawals for a Freelancer
export const getFreelancerWithdrawals = async (req: Request, res: Response) => {
  try {
    const { freelancerId } = req.params;

    // Find all withdrawals for the freelancer
    const withdrawals = await Withdrawal.find({ freelancerId });

    return res.status(200).json({ withdrawals });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
