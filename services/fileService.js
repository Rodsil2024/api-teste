const db = require('../database/db');

console.log('DEBUG DB:', db);

exports.saveFile = (username, filename) => {
  db.run(
    'INSERT INTO files (username, filename) VALUES (?, ?)',
    [username, filename]
  );
};

exports.getFilesByUser = (username, callback) => {
  db.all(
    'SELECT * FROM files WHERE username = ?',
    [username],
    (err, rows) => {
      callback(err, rows);
    }
  );
};

exports.getFileByNameAndUser = (filename, username, callback) => {
  db.get(
    'SELECT * FROM files WHERE filename = ? AND username = ?',
    [filename, username],
    (err, row) => {
      callback(err, row);
    }
  );
};

exports.deleteFile = (filename, username, callback) => {
  db.run(
    'DELETE FROM files WHERE filename = ? AND username = ?',
    [filename, username],
    function (err) {
      callback(err, this.changes);
    }
  );
};