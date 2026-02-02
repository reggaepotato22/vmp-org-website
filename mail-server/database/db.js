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
    // We don't exit process here to allow the server to run even if DB fails temporarily (though APIs will fail)
  }
};

module.exports = {
  pool,
  runMigrations
};
