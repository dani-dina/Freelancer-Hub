import { Request, Response } from 'express';
import { Conversation } from '../models/conversation.model';
import { HTTP_STATUS } from '../constants/status';

// Get all conversations
const getConversations = async (req: Request, res: Response) => {
    try {
        const conversations = await Conversation.find().populate('members');
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'All conversations fetched',
            data: conversations,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error while fetching conversations',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get conversation by ID
const getConversationById = async (req: Request, res: Response) => {
    try {
        const conversation = await Conversation.findById(req.params.id).populate('members');
        if (!conversation) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Conversation not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Conversation found',
            data: conversation,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error while fetching conversation',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Create new conversation
const createConversation = async (req: Request, res: Response) => {
    try {
        const { members, lastMessage } = req.body;

        // Optional: Prevent duplicate 1-on-1 conversation
        const existingConversation = await Conversation.findOne({ members: { $all: members, $size: members.length } });
        if (existingConversation) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                message: 'Conversation already exists',
            });
        }

        const newConversation = new Conversation({ members, lastMessage });
        await newConversation.save();

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'Conversation successfully created',
            data: newConversation,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error while creating conversation',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Update conversation (e.g., lastMessage and lastUpdated)
const updateConversation = async (req: Request, res: Response) => {
    try {
        const { lastMessage } = req.body;
        const updated = await Conversation.findByIdAndUpdate(
            req.params.id,
            { lastMessage, lastUpdated: Date.now() },
            { new: true }
        );

        if (!updated) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Conversation not found',
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Conversation updated',
            data: updated,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error while updating conversation',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete conversation
const deleteConversation = async (req: Request, res: Response) => {
    try {
        const deleted = await Conversation.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Conversation not found',
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Conversation deleted',
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error while deleting conversation',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export {
    getConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation,
};
