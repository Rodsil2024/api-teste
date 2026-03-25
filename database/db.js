const Database = require('better-sqlite3');

const db = new Database('./database/database.db');

console.log('Banco conectado 🚀');

// garante tabela sempre
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`).run();

module.exports = db;