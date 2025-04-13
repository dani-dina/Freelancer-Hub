import { Request, Response } from 'express';
import { FAQ } from '../models/faq.model';
import { HTTP_STATUS } from '../constants/status';

// Get all FAQs
const getFAQs = async (req: Request, res: Response) => {
    try {
        const faqs = await FAQ.find();
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'All FAQs fetched successfully',
            data: faqs,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while fetching FAQs',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get FAQ by ID
const getFAQById = async (req: Request, res: Response) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'FAQ not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'FAQ fetched successfully',
            data: faq,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while fetching FAQ',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Create new FAQ
const createFAQ = async (req: Request, res: Response) => {
    try {
        const { question, answer } = req.body;
        const newFAQ = new FAQ({ question, answer });
        await newFAQ.save();
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'FAQ created successfully',
            data: newFAQ,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while creating FAQ',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Update FAQ
const updateFAQ = async (req: Request, res: Response) => {
    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFAQ) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'FAQ not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'FAQ updated successfully',
            data: updatedFAQ,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while updating FAQ',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete FAQ
const deleteFAQ = async (req: Request, res: Response) => {
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
        if (!deletedFAQ) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'FAQ not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'FAQ deleted successfully',
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while deleting FAQ',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export {
    getFAQs,
    getFAQById,
    createFAQ,
    updateFAQ,
    deleteFAQ,
};
