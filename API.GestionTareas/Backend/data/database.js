import sqlite from 'sqlite3'; 
import {open} from 'sqlite'; // funcion para la base de datos

const connectDB = async () => {

    return open({
        filename : './tasks.db',
        driver : sqlite.Database
    });
};

const initializeDB  = async () => {
     const db = await connectDB();
     await db.exec(` 
        CREATE TABLE  IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'to-do'
        );
        
    `);
    console.log("Base de datos SQlite esta conectada.");
};

export {connectDB, initializeDB};