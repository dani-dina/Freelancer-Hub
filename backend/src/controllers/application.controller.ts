import { HTTP_STATUS } from '../constants/status';
import { Application } from '../models/application.model';
import { Request,Response } from 'express';


// get all application
const getApplications =  async(req : Request, res : Response)=>{
    try{
        const applications = await Application.find();
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : 'All applications fethed',
            data : applications
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

// get applicatins by id
const getApplicationById = async(req : Request, res : Response)=>{
    try{
        const application = await Application.findById(req.params.id);
        if(!application){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : 'Application not found'
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : 'Application Found',
            data : application
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

// create a new application 
const createApplication = async(req : Request,res : Response)=>{
    const appId = req.params.id;
    try{
        const {jobId,freelancerId,coverLetter,status,createdAt} = req.body;
        const existingApplication = await Application.findOne({appId,freelancerId});
        if(existingApplication){
            return res.status(HTTP_STATUS.CONFLICT).json({
                success : false,
                message : "Application already exists"
            });
        }
        const newApplication = new Application({jobId,freelancerId,coverLetter,status,createdAt});
        await newApplication.save();
        return res.status(HTTP_STATUS.CREATED).json({
            success : true,
            message : "Application successfuly created"
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

// update application by id
const updateApplicationById = async(req : Request, res : Response)=>{
    try{
        const updateApplication = await Application.findByIdAndUpdate(req.params.id,req.body,{ new : true});
        if(!updateApplication){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : "Application not found "
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : "Application successfully updated "
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

// delete application by id
const deleteApplicationById = async(req : Request, res : Response)=>{
    try{
        const deleteApplication = await Application.findByIdAndDelete(req.params.id);
        if(!deleteApplication){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success : false,
                message : "Application not found "
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success : true,
            message : "Application successfully deleted "
        });
    }catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}