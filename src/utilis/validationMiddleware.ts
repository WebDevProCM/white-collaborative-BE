import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { catchAsync } from "./asyncErrorHandler";
import { userLogin } from "../types/user";
import { AppError } from "./errorHandler";

interface CustomRequest extends Request {
    body: userLogin;
}

const validationMiddleware = (schema: ZodSchema) => 
  catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if(!validationResult.success){
    return next(new AppError(400, JSON.stringify({errors: validationResult.error.flatten().fieldErrors})))
    }
    
    next();
});

export default validationMiddleware;