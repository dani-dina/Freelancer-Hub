import { Request, Response } from "express";
import { JobHistory } from "../models/jobHistory.model";
import { HTTP_STATUS } from "../constants/status";

// Get all job history records
const getAllJobHistories = async (_req: Request, res: Response) => {
  try {
    const history = await JobHistory.find()
      .populate("jobId freelancerId clientId");
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "All job histories retrieved",
      data: history,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching job histories",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get job history by ID
const getJobHistoryById = async (req: Request, res: Response) => {
  try {
    const history = await JobHistory.findById(req.params.id)
      .populate("jobId freelancerId clientId");

    if (!history) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Job history not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Job history retrieved",
      data: history,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching job history",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Create a job history record
const createJobHistory = async (req: Request, res: Response) => {
  try {
    const { jobId, freelancerId, clientId, action } = req.body;

    const newHistory = new JobHistory({
      jobId,
      freelancerId,
      clientId,
      action,
    });

    await newHistory.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Job history created successfully",
      data: newHistory,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating job history",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a job history record
const deleteJobHistory = async (req: Request, res: Response) => {
  try {
    const deleted = await JobHistory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Job history not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Job history deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting job history",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getAllJobHistories,
  getJobHistoryById,
  createJobHistory,
  deleteJobHistory,
};
