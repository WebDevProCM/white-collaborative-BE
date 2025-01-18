import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
})

export const createUserSchema = z.object({
    username: z.string().min(6, {message: "Username must be at least 6 characters long"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
})

export const updateUserSchema = z.object({
    username: z.string().min(6, {message: "Username must be at least 6 characters long"}),
})