import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Cache the database connection
let db;

// Function to initialize the database connection
const initDb = async () => {
    db = await open({
        filename: './db/data/cemtrak_event_log.db', // Replace with your database file path
        driver: sqlite3.Database
    });
};

export { db, initDb }