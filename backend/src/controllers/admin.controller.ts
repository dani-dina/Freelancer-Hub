import { Admin } from '../models/admin.model';
import { Request,Response } from 'express';
import { HTTP_STATUS } from '../constants/status';

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

    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}