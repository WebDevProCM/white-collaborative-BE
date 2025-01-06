import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controllers/usersController";

export const userRouter = Router();

userRouter.post("/api/register", createUser);

userRouter.post("/api/login", loginUser);

userRouter.get("/api/logout", logoutUser);