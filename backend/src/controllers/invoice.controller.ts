import { Request, Response } from 'express';
import { Invoice } from '../models/invoice.model';
import { HTTP_STATUS } from '../constants/status';

// Get all invoices
const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find().populate('paymentId issuedTo issuedBy');
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'All invoices fetched successfully',
            data: invoices,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while fetching invoices',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get invoice by ID
const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('paymentId issuedTo issuedBy');
        if (!invoice) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Invoice not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Invoice fetched successfully',
            data: invoice,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while fetching invoice',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Create a new invoice
const createInvoice = async (req: Request, res: Response) => {
    try {
        const { paymentId, amount, issuedTo, issuedBy, issuedAt, dueDate } = req.body;

        const newInvoice = new Invoice({
            paymentId,
            amount,
            issuedTo,
            issuedBy,
            issuedAt,
            dueDate,
        });

        await newInvoice.save();
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'Invoice created successfully',
            data: newInvoice,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while creating invoice',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Update invoice
const updateInvoice = async (req: Request, res: Response) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Invoice not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Invoice updated successfully',
            data: updatedInvoice,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while updating invoice',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete invoice
const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Invoice not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Invoice deleted successfully',
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error occurred while deleting invoice',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export {
    getInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
