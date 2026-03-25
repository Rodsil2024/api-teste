const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const { secret } = require('../config/jwt');

exports.login = (req, res) => {
  const { user, password } = req.body;

db.all(
  'SELECT * FROM users WHERE username = ?',
  [user],
  (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no banco' });
    }

    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }

    // procurar o usuário com senha válida
    const validUser = rows.find(u => bcrypt.compareSync(password, u.password));

    if (!validUser) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { user: validUser.username },
      secret,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login realizado!',
      token: token
    });
  }
);
}
