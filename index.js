const express = require('express');
const app = express();

app.use(express.json());

// importar rotas
const testRoutes = require('./routes/testRoutes');

// usar rotas
app.use('/api', testRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
