import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware'

const authRoutes = express.Router();

authRoutes.post('/register', authMiddleware.validateRegister, authController.register);
authRoutes.post('/login', authMiddleware.validateLogin, authController.login);
authRoutes.get('/check', authMiddleware.authenticateJWT, authController.checkSessionStatus);
authRoutes.post('/logout', authMiddleware.authenticateJWT, authController.logout);

export default authRoutes;