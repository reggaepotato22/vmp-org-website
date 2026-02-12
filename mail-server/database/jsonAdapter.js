const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, 'local_db.json');

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
    const initialData = {
        users: [],
        missions: [],
        gallery: [],
        news: [],
        projects: [],
        team: [],
        settings: {},
        subscribers: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

const readDB = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {
        return {};
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Helper to simulate MySQL-like queries for simple CRUD
const query = async (sql, params = []) => {
    const db = readDB();
    const lowerSql = sql.toLowerCase().trim();

    // SELECT
    if (lowerSql.startsWith('select')) {
        // Very basic parser for "SELECT * FROM table"
        const match = lowerSql.match(/from\s+(\w+)/);
        if (match) {
            const table = match[1];
            let rows = db[table] || [];
            
            // Handle WHERE clause (simple equality only for now)
            if (lowerSql.includes('where')) {
                // This is a simplified mock. For complex queries, this won't work perfectly,
                // but it's enough for basic admin dashboard lists.
                // You might need to expand this for specific lookups.
                return [rows, []]; 
            }
            
            return [rows, []];
        }
    }

    // INSERT
    if (lowerSql.startsWith('insert into')) {
        const match = lowerSql.match(/insert into\s+(\w+)/);
        if (match) {
            const table = match[1];
            if (!db[table]) db[table] = [];
            
            // Extract values - this is tricky with raw SQL strings.
            // Ideally, we'd map the params to the object structure.
            // For now, let's assume standard column order or simple objects.
            
            // STRATEGY: For a robust fallback, we should probably export specific methods 
            // (getAll, create, update, delete) rather than parsing SQL.
            // But to keep the "pool.query" interface, we have to fake it.
            
            // fallback: return success but log warning
            console.log('JSON DB: Insert not fully supported via raw SQL parser. Use adapter methods.');
            return [{ insertId: Date.now() }, []];
        }
    }

    // UPDATE / DELETE ...
    
    return [[], []];
};

// BETTER APPROACH: Export a specialized adapter that the routes can use
// if they detect they are running in "JSON Mode".
// However, that requires rewriting all routes.
// Let's instead make the `pool` object smart.

module.exports = {
    readDB,
    writeDB,
    DB_FILE
};
