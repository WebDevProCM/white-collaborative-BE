import mysql from "mysql2/promise";

const connection = mysql.createPool({host: "localhost", user: "root", password: "webdevprocmmysql123!@#", database: "whiteboard"});

export default connection;