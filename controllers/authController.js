const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

exports.login = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }

  try {
    // busca usuário
    const userData = db.prepare(
      "SELECT * FROM users WHERE username = ?"
    ).get(user);

    if (!userData) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }

    // valida senha
    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // gera token
    const token = jwt.sign(
      {
        id: userData.id,
        user: userData.username
      },
      config.secret,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
};
  


