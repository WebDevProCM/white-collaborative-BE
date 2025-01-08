import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utilis/asyncErrorHandler";


export const createBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    res.send("Board created successfully!")
})

export const readBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    res.send("Board details!")
})

export const updateBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    res.send("Board updated!")
})

export const deleteBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    res.send("Board deleted!")
})