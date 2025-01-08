import { Router } from "express";
import { createUser, loginUser, logoutUser, updateUser } from "../controllers/usersController";
import authMiddleware from "../utilis/authMiddleware";

export const userRouter = Router();

userRouter.post("/api/user/login", loginUser);

userRouter.get("/api/user/logout", logoutUser);

userRouter.post("/api/user/register", createUser);

userRouter.post("/api/user/profile", authMiddleware, updateUser);