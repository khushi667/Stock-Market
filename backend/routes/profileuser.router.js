import express from 'express';
import { 
  signup, 
  getProfile, 
  updateProfile, 
  deleteAccount, 
  getSessionProfile, 
  logout 
} from '../controllers/ProfileUserController.js';
import protectRoute from '../middleware/protectRoute.js';
import authMiddleware from '../middleware/authmiddleware.js'; // Session-based

const router = express.Router();

// JWT-based routes
router.post('/signup', signup);
router.get('/profile', protectRoute, getProfile);
router.put('/profile', protectRoute, updateProfile);
router.delete('/delete', protectRoute, deleteAccount);

// Session-based routes
router.get('/session-profile', authMiddleware, getSessionProfile);
router.post('/logout', authMiddleware, logout);

export default router;
