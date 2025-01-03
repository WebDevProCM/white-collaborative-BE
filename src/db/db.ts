import mysql from "mysql2/promise";

const connection = mysql.createPool({host: process.env.DBHOST, user: process.env.DBUSER, password: `${process.env.DBPASS}#`, database: process.env.DB});

export default connection;