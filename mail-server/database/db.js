const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vmp_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Migration Runner
const runMigrations = async () => {
  console.log('Checking database migrations...');
  try {
    // Step 1: Ensure Database Exists
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await tempConnection.end();

    // Step 2: Run Schema Migrations
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split queries by semicolon (basic implementation)
    // Note: This is a simple parser, might fail on semicolons inside strings.
    // For a robust solution, use a proper migration tool, but this fits "simple/lowkey".
    const queries = schemaSql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    const connection = await pool.getConnection();
    
    try {
      for (const query of queries) {
        await connection.query(query);
      }
      
      // Migration: Add category to projects if not exists
      try {
        await connection.query('ALTER TABLE projects ADD COLUMN category VARCHAR(100)');
      } catch (e) {
        if (e.code !== 'ER_DUP_FIELDNAME') {
          console.log('Note: Column category already exists or other error:', e.message);
        }
      }

      // Seed Admin User if not exists
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@kenyavetsmission.org']);
      if (rows.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await connection.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', ['admin@kenyavetsmission.org', hashedPassword]);
        console.log('Default admin user created.');
      }

      console.log('Database migrations completed successfully.');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Migration failed:', error);
    if (error.code === 'ECONNREFUSED') {
        console.error('\n\x1b[31m%s\x1b[0m', 'ERROR: Could not connect to the database.');
        console.error('\x1b[33m%s\x1b[0m', 'Please ensure your MySQL server (e.g., XAMPP, WAMP, or MySQL Service) is running.');
        console.error('Check your .env file to ensure DB_HOST, DB_USER, and DB_PASSWORD are correct.\n');
    }
  }
};

module.exports = {
  pool,
  runMigrations
};
