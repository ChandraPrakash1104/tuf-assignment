import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

async function createDatabase() {
  try {
    const res = await pool.query(`CREATE TABLE IF NOT EXISTS user_code(
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      preferred_language ENUM('C++', 'Java', 'JavaScript', 'Python') NOT NULL,
      stdin TEXT,
      source_code TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);
    console.log(res);
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function createUserCode(
  username,
  preferred_language,
  stdin,
  source_code
) {
  const [result] = await pool.query(
    `
  INSERT INTO user_code (username, preferred_language, stdin, source_code)
  VALUES (?, ?, ?, ?)
  `,
    [username, preferred_language, stdin, source_code]
  );
  return result;
}

export async function getUserCodeUsingId(id) {
  const [rows] = await pool.query(`SELECT * FROM user_code WHERE id=?`, [id]);
  return rows[0];
}

export async function getUserCodeUsingUsername(username) {
  const [rows] = await pool.query(`SELECT * FROM user_code WHERE username=?`, [
    username,
  ]);
  return rows[0];
}

export async function getAllUserCode() {
  const [rows] = await pool.query(`SELECT * FROM user_code`);
  return rows;
}

checkConnection();
createDatabase();
