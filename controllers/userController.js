const db = require('../database/db');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    ).run(user, hashedPassword);

    res.json({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};