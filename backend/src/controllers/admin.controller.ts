import { Admin } from '../models/admin.model';
import { Request,Response } from 'express';
import { HTTP_STATUS } from '../constants/status';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
}

interface DecodedToken {
    id: string;
    role: string;
}
dotenv.config();
// Find admins by id
const findAdmins = async(email : string)=>{
        const  admin = await Admin.findOne({email});
        return admin;
}
// get all admins
const getAdmins = async (req :Request,res:Response)=>{
    try{
        const admins = await Admin.find().select('-password');
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            data : admins
        });

    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// Get one admin
const getAdminById =  async(req : Request, res : Response)=>{
    try{
        const admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : "Admin Not Found"
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            data : admin
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// Add a new admins
const addNewAdmin = async(req : Request, res : Response)=>{
    try{
        const {firstName,lastName,email,password,role,createdAt} = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
              success: false,
              message: "All fields are required",
            });
          }
        const existingAdmin = await findAdmins(email);
        if(existingAdmin){
            return res.status(HTTP_STATUS.CONFLICT).json({
                success : false,
                message : "Admin already exists"
            });
        } 
        const admin = new Admin({firstName,lastName,email,password,role,createdAt} );
        await admin.save();

        return res.status(HTTP_STATUS.CREATED).json({
            success : true,
            message : "Successfully added !",
            data : admin
        });

    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// update admin by id
const updateAdminById = async(req : Request, res : Response)=>{
    try{
        const updateAdminById = await Admin.findByIdAndUpdate(req.params.id,req.body,{ new : true});
        if(!updateAdminById){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : 'Admin not found '
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : "Successfully updated",
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// Delete admin by id
const deleteAdminById = async(req : Request, res : Response)=>{
    try{
        const deleteAdminById = await Admin.findByIdAndDelete(req.params.id);
        if(!deleteAdminById){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : 'Admin not found '
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : "Successfully Deleted",
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// admin login
const adminLogin = async(req : Request, res : Response)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success : false,
                message : "Email and password required !"
            });
        }
        const admin = await findAdmins(email);
        if(!admin){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success : false,
                message : "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success : false,
                message : "Invalid credentials"
            });
        }
        const token = jwt.sign({ id: admin._id, role: "admin" },JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : 'Successfully loged in',
            token,
            admin : {
                id : admin._id,
                email : admin.email,
                name : admin.firstName
            }
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
// Refresh token 
const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Refresh token missing"
        });
    }

    jwt.verify(token, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
        if (err || !decoded || typeof decoded !== 'object') {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Invalid or expired refresh token"
            });
        }

        const { id, role } = decoded as DecodedToken;

        const accessToken = jwt.sign({ role, id }, JWT_SECRET, {
            expiresIn: '1d'
        });

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            accessToken,
            message: "Access token refreshed successfully"
        });
    });
};

// email verificatino
const emailVerification = async(req : Request, res : Response)=>{
    try{

    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
//get profiles
const getProfile = async(req : Request, res : Response)=>{
    try{

    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}