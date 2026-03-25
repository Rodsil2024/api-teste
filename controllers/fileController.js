const fileService = require('../services/fileService');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'Arquivo não enviado'
    });
  }

  const user = req.user.user;

  fileService.saveFile(user, req.file.filename);

  res.json({
    message: 'Arquivo enviado com sucesso!',
    user: user,
    file: req.file.filename
  });
};

exports.getMyFiles = (req, res) => {
  const user = req.user.user;

  fileService.getFilesByUser(user, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar arquivos' });
    }

    res.json(files);
  });
};

const path = require('path');

exports.downloadFile = (req, res) => {
  const user = req.user.user;
  const filename = req.params.filename;

  fileService.getFileByNameAndUser(filename, user, (err, file) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (!file) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', filename);

    res.download(filePath);
  });
};

const fs = require('fs');

exports.deleteFile = (req, res) => {
  const user = req.user.user;
  const filename = req.params.filename;

  fileService.deleteFile(filename, user, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    // remover arquivo da pasta
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar arquivo físico' });
      }

      res.json({ message: 'Arquivo deletado com sucesso!' });
    });
  });
};