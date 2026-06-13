import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import config from '../config/config';

function validateCredentials(username: string, password: string): void {
  if (!username || !password) {
    throw new Error('Username and password required');
  }
}

function validatePassword(password: string): void {

    if (password.length < 6) {
        throw new Error('password must have at least 6 characters');
    }

    if(!/[A-Z]/.test(password)) {
        throw new Error('password must have at least one uppercase letter');
    }

    if(!/[a-z]/.test(password)) {
        throw new Error('password must have at least one lowercase letter');
    }

    if(!/[0-9]/.test(password)) {
        throw new Error('password must have at least one number');
    }

}

const authMiddleware = {

    validateLogin (req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        try {

            validateCredentials(username, password);
            next();

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            return res.status(400).json({
                message: 'Validation Error',
            });

        }

    },

    validateRegister (req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        try {

            validateCredentials(username, password);
            validatePassword(password);
            next();

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            return res.status(400).json({
                message: 'Validation Error',
            });

        }

    },

    authenticateJWT (req: Request, res: Response, next: NextFunction) {

        if (req.method === 'OPTIONS') {
            return next();
        }
        
        const token = req.cookies?.access_token;

        if (!token) {
            return res.status(401).json({message: 'Authentication required'});
        }

        try {
            req.user = jwt.verify(token, config.JWT_SECRET) as {id: string; username: string};
            next();
        } catch (error) {
            res.status(401).json({
            message: 'Invalid or expired token'
            });
        }
    },

    validateChangePassword(req: Request, res: Response, next: NextFunction) {
        const { username, password, newPassword } = req.body;

        try {
            validateCredentials(username, password);

            if (!newPassword) {throw new Error('New password required');}

            validatePassword(newPassword);

            next();

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({message: error.message,});
            }

            return res.status(400).json({message: 'Validation Error',});
        }
    }

};

export default authMiddleware;