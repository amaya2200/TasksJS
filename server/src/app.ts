import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes';
import listRoutes from './routes/listRoutes';
import authMiddleware from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';
import config from './config/config';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
}));

app.use(errorHandler);
app.use('/auth', authRoutes);
app.use(authMiddleware.authenticateJWT);
app.use('/task', taskRoutes);
app.use('/list', listRoutes);

export default app;