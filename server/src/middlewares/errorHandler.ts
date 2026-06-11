import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        return res.status(400).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: 'Internal server error',
    });
}

export default errorHandler;