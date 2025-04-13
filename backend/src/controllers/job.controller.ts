import { Request, Response } from 'express';
import { Job } from '../models/job.model';
import { HTTP_STATUS } from '../constants/status';

// Get all jobs
const getJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate('clientId applicants');
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'All jobs fetched successfully',
      data: jobs,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching jobs',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get job by ID
const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate('clientId applicants');
    if (!job) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Job fetched successfully',
      data: job,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching job',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Create a new job
const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description, category, budget, clientId, status, applicants } = req.body;

    const newJob = new Job({
      title,
      description,
      category,
      budget,
      clientId,
      status,
      applicants,
    });

    await newJob.save();

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Job created successfully',
      data: newJob,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error creating job',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a job
const updateJob = async (req: Request, res: Response) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating job',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a job
const deleteJob = async (req: Request, res: Response) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error deleting job',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
