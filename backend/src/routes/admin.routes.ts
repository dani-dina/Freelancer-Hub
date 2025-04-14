import express, { Request, Response } from 'express';
import adminController from '../controllers/admin.controller'; // Import your existing controller functions

const {
    getAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdminById,
    getProfile,
    searchAdmin,
    refreshToken,
} = adminController;

const router = express.Router(); // Create a new router instance

// Route to get all admins
router.get('/admins', async (req: Request, res: Response) => {
    try {
        await getAdmins(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching admins',
            error: error instanceof Error ? error.message : error,
        });
    }
});

// Route to get a specific admin by ID
router.get('/admins/:id', async (req: Request, res: Response) => {
    try {
        await getAdminById(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching admin',
            error: error instanceof Error ? error.message : error,
        });
    }
});

// Route to add a new admin
router.post('/admins', async (req: Request, res: Response) => {
    try {
        await addNewAdmin(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding new admin',
            error: error instanceof Error ? error.message : error,
        });
    }
});

// Export the router to use in your main app
export default router;
