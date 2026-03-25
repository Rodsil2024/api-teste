const bcrypt = require('bcrypt');
const db = require('../database/db');

exports.createUser = (req, res) => {
  const { user, password } = req.body;

  // 🔍 verificar se já existe
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [user],
    (err, row) => {
      if (row) {
        return res.status(400).json({
          error: 'Usuário já existe'
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [user, hashedPassword],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
          }

          res.json({
            message: 'Usuário criado com sucesso!',
            userId: this.lastID
          });
        }
      );
    }
  );
};