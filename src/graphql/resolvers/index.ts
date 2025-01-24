import { GraphQLError } from "graphql";
import Validator from 'validator';
import connection from "../../db/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";


const createToken = async (user: {}) =>{
    const maxAge = 1000 * 60 * 60 * 12;
    return JWT.sign(user, process.env.SECRET!, {expiresIn: maxAge});
}

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production"
}

export const resolvers = {
    login: async (args: any, res:any) => {
        if(args.password.length < 8){
            throw new GraphQLError("Invalid credentials!", {
                extensions: {
                  code: 401,
                },
            });
        }
    
        if(!Validator.isEmail(args.email)){
            throw new GraphQLError("Invalid credentials!", {
                extensions: {
                  code: 401,
                },
            });
        }

        const query = `SELECT * FROM users WHERE email = ?`;
        const [user] = await connection.execute<RowDataPacket[]>(query, [args.email]);
        if(user.length > 0){
            const userDetails = user[0];
            const passwordCheck = await bcrypt.compare(args.password, userDetails.password);
            if(!passwordCheck){
                throw new GraphQLError("Invalid credentials!", {
                    extensions: {
                      code: 401,
                    },
                });
            }
    
            const userValue = {id: userDetails.id, username: userDetails.username, email: userDetails.email}
            const token = await createToken(userValue);
            return {...userValue}
            // res.cookie("accessToken", token, cookieOptions);
            // res.status(200).send(userValue);
        }
    },

    createUser: async (args: any, res: any) =>{
        if(!Validator.isEmail(args.email)){
            throw new GraphQLError("Invalid email addresss!", {
                extensions: {
                  code: 400,
                },
            });
        }
        if(!args.password){
            throw new GraphQLError("Please provide a password!", {
                extensions: {
                  code: 400,
                },
            });
        }
    
        const hashedPassword = await bcrypt.hash(args.password, 8);
    
        const query = `INSERT INTO users (username, email, password) VALUES(?, ?, ?)`;
        const values = [args.username, args.email, hashedPassword];
        const result = await connection.execute(query, values);
    
        const token = await createToken({username: args.username, email: args.email, role: "user"});
        // res.cookie("accessToken", token, cookieOptions);
        // res.status(201).send("User created");
        return {
            username: args.username,
            email: args.email
        }
    }

}