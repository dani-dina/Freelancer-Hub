import { Request, Response } from "express";
import { Review } from "../models/review.model";
import { HTTP_STATUS } from "../constants/status";

// Create a new review
const createReview = async (req: Request, res: Response) => {
  try {
    const { reviewerId, reviewedId, jobId, rating, comment } = req.body;

    const newReview = new Review({
      reviewerId,
      reviewedId,
      jobId,
      rating,
      comment,
    });

    await newReview.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create review",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get reviews for a job
const getJobReviews = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    const reviews = await Review.find({ jobId }).populate("reviewerId", "name");

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get reviews written by a user
const getUserReviews = async (req: Request, res: Response) => {
  try {
    const { reviewerId } = req.params;

    const reviews = await Review.find({ reviewerId }).populate("jobId", "title");

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch user reviews",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a review (rating or comment)
const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update review",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a review
const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete review",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  createReview,
  getJobReviews,
  getUserReviews,
  updateReview,
  deleteReview,
};
