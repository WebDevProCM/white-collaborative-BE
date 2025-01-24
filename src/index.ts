import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express"
import http from "http"
import { Server } from "socket.io";
import cors from "cors"
import cookieParser from "cookie-parser"
import { CustomError } from "./types/error";
import { initialiseBoard, initialiseUser } from "./models/tables";
import connection from "./db/db";
import { userRouter } from './routers/usersRouter';
import { boardRouter } from './routers/boardRouter';
import { createHandler } from "graphql-http/lib/use/express";
import { graphqlSchema } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.use(userRouter);
app.use(boardRouter);

initialiseUser();
initialiseBoard();


app.get("/", (req: Request, res: Response) =>{
    console.log("Running api");
    res.send({success: true});
})

io.on("connection", (socket) =>{
    socket.emit("user", "welcome");

    socket.on("disconnect", () =>{
        console.log("user disconnected")
    })
})

app.use("/graphql", createHandler({
    schema: graphqlSchema,
    rootValue: resolvers,
}))

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) =>{
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.message = err.message ? err.message : "Something went wrong in server side!"
    if(err.message.includes("errors")){
        err.message = JSON.parse(err.message);
    }

    res.status(err.statusCode).send({
        status: err.statusCode,
        error: err.message
    })
})

server.listen(3001, () =>{
    console.log("server is runnig");
})

process.on("unhandledRejection", (err: any) =>{
    server.close(() =>{
        console.log(err.name, err.message);
        process.exit(1);
    })
})