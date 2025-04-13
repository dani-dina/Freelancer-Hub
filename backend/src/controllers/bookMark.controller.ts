import { Request, Response } from 'express';
import { Bookmark } from '../models/bookMarks.model';
import { HTTP_STATUS } from '../constants/status';

// Get all bookmarks
const getBookmarks = async (req: Request, res: Response) => {
    try {
        const bookmarks = await Bookmark.find().populate('userId jobId');
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'All bookmarks fetched',
            data: bookmarks,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error while fetching bookmarks',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get bookmark by ID
const getBookmarkById = async (req: Request, res: Response) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id).populate('userId jobId');
        if (!bookmark) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Bookmark not found',
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Bookmark found',
            data: bookmark,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error while fetching bookmark',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Create a new bookmark
const createBookmark = async (req: Request, res: Response) => {
    try {
        const { userId, jobId } = req.body;

        const existingBookmark = await Bookmark.findOne({ userId, jobId });
        if (existingBookmark) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                message: 'Bookmark already exists for this user and job',
            });
        }

        const newBookmark = new Bookmark({ userId, jobId });
        await newBookmark.save();

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'Bookmark successfully created',
            data: newBookmark,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error while creating bookmark',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete bookmark by ID
const deleteBookmarkById = async (req: Request, res: Response) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        if (!deletedBookmark) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Bookmark not found',
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Bookmark successfully deleted',
            data: deletedBookmark,
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error while deleting bookmark',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export {
    getBookmarks,
    getBookmarkById,
    createBookmark,
    deleteBookmarkById,
};
