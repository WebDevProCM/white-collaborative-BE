import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utilis/asyncErrorHandler";
import { createBoardInput } from "../types/board";
import { userToken } from "../types/user";
import connection from "../db/db";


interface CustomRequest extends Request {
    user?: userToken;
    body: createBoardInput;
}
export const createBoard = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) =>{
    const query = `INSERT INTO whiteboard(title, permissions, content, owner_id) VALUES(?,?,?,?)`;
    const values = [req.body.title, req.body.permissions, req.body.content, req.user!.id];
    const result = await connection.execute(query, values);
    res.send("Board created successfully!")
})

export const readBoard = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) =>{
    const query = `SELECT * FROM whiteboard WHERE owner_id = ?`;
    const values = [req.user!.id];
    const result = await connection.execute(query, values);
    res.send(result[0]);
})

export const updateBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    const query = `UPDATE whiteboard SET title = ?, permissions = ?, content = ? WHERE id = ?`;
    const values = [req.body.title, req.body.permissions, req.body.content, req.params.id];
    const result = await connection.execute(query, values);
    res.send("Board updated!");
})

export const deleteBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    const query = `DELETE FROM whiteboard WHERE id = ?`;
    const values = [req.params.id];
    const result = await connection.execute(query, values);
    res.send("Board deleted!");
})