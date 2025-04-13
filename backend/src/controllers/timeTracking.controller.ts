import { Request, Response } from "express";
import { TimeTracking } from "../models/timeTracking.model";
import { HTTP_STATUS } from "../constants/status";

// Create a new time tracking entry
const createTimeTracking = async (req: Request, res: Response) => {
  try {
    const { jobId, freelancerId, startTime, endTime } = req.body;

    const totalHours = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);

    const newTimeTracking = new TimeTracking({
      jobId,
      freelancerId,
      startTime,
      endTime,
      totalHours,
    });

    await newTimeTracking.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Time tracking entry created successfully",
      data: newTimeTracking,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create time tracking entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all time tracking entries for a freelancer or job
const getTimeTrackingByFreelancer = async (req: Request, res: Response) => {
  try {
    const { freelancerId } = req.params;

    const timeTrackings = await TimeTracking.find({ freelancerId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Time tracking entries fetched successfully",
      data: timeTrackings,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch time tracking entries",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const getTimeTrackingByJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    const timeTrackings = await TimeTracking.find({ jobId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Time tracking entries for the job fetched successfully",
      data: timeTrackings,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch time tracking entries",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update time tracking entry (e.g., modify start time, end time, or recalculate hours)
const updateTimeTracking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startTime, endTime } = req.body;

    const totalHours = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);

    const updatedTimeTracking = await TimeTracking.findByIdAndUpdate(
      id,
      { startTime, endTime, totalHours },
      { new: true }
    );

    if (!updatedTimeTracking) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Time tracking entry not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Time tracking entry updated successfully",
      data: updatedTimeTracking,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update time tracking entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a time tracking entry
const deleteTimeTracking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTimeTracking = await TimeTracking.findByIdAndDelete(id);

    if (!deletedTimeTracking) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Time tracking entry not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Time tracking entry deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete time tracking entry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  createTimeTracking,
  getTimeTrackingByFreelancer,
  getTimeTrackingByJob,
  updateTimeTracking,
  deleteTimeTracking,
};
