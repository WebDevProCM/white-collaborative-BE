import { NextFunction, Request, Response } from "express"
import { AppError } from "./errorHandler"

export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response , next: NextFunction) =>{
        fn(req, res, next).catch((e: string) => next(new AppError(400, e)))
    }
}