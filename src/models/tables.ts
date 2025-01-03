import connection from "../db/db";

export const initialiseUser = async () =>{
  try{
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(20) NOT NULL UNIQUE,
          PASSWORD VARCHAR(16) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

  }catch(e){
    console.log("tables error")
    console.log(e);
  }
}

export const initialiseBoard = async () =>{
  try{
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS whiteboard(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        permissions JSON NOT NULL,
        content TEXT,
        owner_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(owner_id) REFERENCES users(id)
      )`);

  }catch(e){
    console.log(e);
  }
}