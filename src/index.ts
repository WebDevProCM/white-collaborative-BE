import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express"
import http from "http"
import { Server } from "socket.io";
import cors from "cors"
import { CustomError } from "./types/error";
import { initialiseBoard, initialiseUser } from "./models/tables";
import connection from "./db/db";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

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

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) =>{
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.message = err.message ? err.message : "Something went wrong in server side!"

    res.status(err.statusCode).send({
        status: err.statusCode,
        error: err.message
    })
})

server.listen(3001, () =>{
    console.log("server is runnig");
})