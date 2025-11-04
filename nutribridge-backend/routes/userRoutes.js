import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyToken, requireRole('admin'), getAllUsers);       // Admin can view all users
router.get('/:id', verifyToken, getUserById);                          // User can view own profile
router.put('/:id', verifyToken, updateUser);                           // User can update own data
router.delete('/:id', verifyToken, requireRole('admin'), deleteUser);  // Only admin can delete

export default router;

