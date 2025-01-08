import { Router } from "express";
import authMiddleware from "../utilis/authMiddleware";
import { createBoard, deleteBoard, readBoard, updateBoard } from "../controllers/boardController";


export const boardRouter = Router();

boardRouter.post("/api/board", authMiddleware, createBoard);

boardRouter.get("/api/board", authMiddleware, readBoard);

boardRouter.patch("/api/board", authMiddleware, updateBoard);

boardRouter.delete("/api/board", authMiddleware, deleteBoard);