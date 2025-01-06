import { NextFunction, Request, Response, Router } from "express";
import { catchAsync } from "../utilis/asyncErrorHandler";
import { registerUser, userLogin } from "../types/user";
import Validator from 'validator';
import bcrypt from "bcrypt";
import { AppError } from "../utilis/errorHandler";
import connection from "../db/db";
import JWT from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

const createToken = async (user: {}) =>{
    const maxAge = 1000 * 60 * 60 * 12;
    return JWT.sign(user, process.env.SECRET!, {expiresIn: maxAge});
}

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production"
}

export const createUser = catchAsync(async (req: Request<{},{},registerUser>, res: Response, next: NextFunction)=>{
    if(!Validator.isEmail(req.body.email)){
        next(new AppError(400, "Invalid email address!"));
    }
    if(!req.body.password){
        next(new AppError(400, "Please provide a password!"));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const query = `INSERT INTO users (username, email, password) VALUES(?, ?, ?)`;
    const values = [req.body.username, req.body.email, hashedPassword];
    const result = await connection.execute(query, values);

    const token = await createToken({username: req.body.username, email: req.body.email, role: "user"});
    res.cookie("accessToken", token, cookieOptions);
    res.status(201).send("User created");
})

export const loginUser =  catchAsync(async (req: Request<{},{}, userLogin>, res: Response, next: NextFunction) =>{
    if(req.body.password.length < 8){
        next(new AppError(401, "Invalid credentials!"));
    }

    if(!Validator.isEmail(req.body.email)){
        next(new AppError(401, "Invalid email addresss!"));
    }

    const query = `SELECT * FROM users WHERE email = ?`;
    const [user] = await connection.execute<RowDataPacket[]>(query, [req.body.email]);
    if(user.length > 0){
        const userDetails = user[0];
        console.log(userDetails);
        const passwordCheck = await bcrypt.compare(req.body.password, userDetails.password);
        if(!passwordCheck){
            return res.status(401).send({error: "Invalid credentials!"})
        }

        const userValue = {id: userDetails.id, username: userDetails.username, email: userDetails.email}
        const token = await createToken(userValue);
        res.cookie("accessToken", token, cookieOptions);
        res.status(200).send(userValue);

    }else{
        res.status(401).send({error: "Invalid credentials!"});
    }

})

export const logoutUser =  catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    res.cookie("accessToken", "", {maxAge: 1});
    res.status(200).send("Logout Successfully!")
})