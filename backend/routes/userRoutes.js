import express from 'express';
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userController.js';
import {protect, isAdmin} from '../middleware/authMiddleware.js'


const router = express.Router();

// Fetch all Products
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.route('/:id').delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser);

export default router