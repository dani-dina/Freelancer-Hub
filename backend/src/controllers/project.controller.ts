import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { HTTP_STATUS } from "../constants/status";

// Get all projects for a client
const getClientProjects = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const projects = await Project.find({ clientId });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch projects",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Create a new project
const createProject = async (req: Request, res: Response) => {
  try {
    const { clientId, title, description, budget, status } = req.body;

    const newProject = new Project({
      clientId,
      title,
      description,
      budget,
      status,
    });

    await newProject.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create project",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update project status
const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Project status updated",
      data: updatedProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update project",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a project
const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete project",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export {
  getClientProjects,
  createProject,
  updateProjectStatus,
  deleteProject,
};
