import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { catchAsync } from './asyncErrorHandler';
import jwt from 'jsonwebtoken';
import { userLogin } from '../types/user';

interface CustomRequest extends Request {
    user?: userLogin;
}

const authMiddleware = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if(!token){
        console.log("hello");
        return next(new AppError(401, "Unauthorized user!"));
    }

    jwt.verify(token, process.env.SECRET!, (err: Error | null, decoded: any) =>{
        if(err){
            return next(new AppError(401, "Unauthorized user!"));
        }

        req.user = decoded;
        next();
    })

})

export default authMiddleware;

