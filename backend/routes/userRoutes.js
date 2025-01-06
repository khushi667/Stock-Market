import express from 'express';
import { postSignup, getSignup, login } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/signup', postSignup);

userRoutes.get('/signup', getSignup);

userRoutes.post('/login', login);

export default userRoutes;
