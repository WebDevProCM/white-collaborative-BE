import { Router } from "express";
import { createUser, loginUser, logoutUser, updateUser } from "../controllers/usersController";
import authMiddleware from "../utilis/authMiddleware";
import validationMiddleware from "../utilis/validationMiddleware";
import { createUserSchema, loginSchema, updateUserSchema } from "../utilis/validations/userSchema";

export const userRouter = Router();

userRouter.post("/api/user/login", validationMiddleware(loginSchema),loginUser);

userRouter.get("/api/user/logout", logoutUser);

userRouter.post("/api/user/register", validationMiddleware(createUserSchema), createUser);

userRouter.patch("/api/user/profile", authMiddleware, validationMiddleware(updateUserSchema), updateUser);