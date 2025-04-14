import { Request, Response } from "express";
import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/status";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, profile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
      role,
      profile,
    });
    await newUser.save();

    return res.status(HTTP_STATUS.CREATED).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(HTTP_STATUS.OK).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

// Login (Authenticate User)
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(HTTP_STATUS.OK).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

// get profile 
const getProfile =  async(req : Request, res : Response)=>{
  try{
      const userId = req.user?.id;
      if(!userId){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized access. No admin ID found.",
        });
      }
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Admin profile not found.",
        });
      }
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          message: "Admin profile fetched successfully.",
          data: user,
        });

  }catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error while fetching admin profile.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// search user
const searchUser = async(req : Request, res : Response)=>{
    try{
        const {
            keyword = "",
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc"
          } = req.query;
          const searchRegex = new RegExp(keyword as string, "i");
          const filters = {
            $or: [
              { firstName: searchRegex },
              { lastName: searchRegex },
              { email: searchRegex }
            ]
          };
          const sortOptions: any = {
            [sortBy as string]: sortOrder === "asc" ? 1 : -1
          }
          const skip = (Number(page) - 1) * Number(limit);

    const admins = await User.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select("-password"); 

    const total = await User.countDocuments(filters);

    return res.status(200).json({
      results: admins,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}