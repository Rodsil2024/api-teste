const express = require('express');
const app = express();

app.use(express.json());

// importar rotas
const testRoutes = require('./routes/testRoutes');

// usar rotas
app.use('/api', testRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
