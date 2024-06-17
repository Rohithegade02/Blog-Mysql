import db from '../config/db.js';

// Create Table
const Blog = {
  createTable: async () => {
    // Query for creating Users table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;
    
    // Query for creating Posts table
    const createPostsTableQuery = `
      CREATE TABLE IF NOT EXISTS Posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        img VARCHAR(255),
        date DATETIME,
        uid INT,
        FOREIGN KEY (uid) REFERENCES Users(id)
      );
    `;
    
    // Execute the queries
    try {
      await db.query(createUsersTableQuery);
      await db.query(createPostsTableQuery);
      
     // await db.query(addCategory)
      console.log("Tables created successfully.");
    } catch (err) {
      console.error("Error creating tables: ", err);
    }
  }
};

export default Blog;
