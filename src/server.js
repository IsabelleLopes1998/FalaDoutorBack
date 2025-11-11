// backend/src/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // em dev você pode usar cors({ origin: 'http://localhost:5173' })
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá do backend!' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
