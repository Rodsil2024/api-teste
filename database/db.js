const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Banco conectado 🚀');
  }
});

module.exports = db;

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);