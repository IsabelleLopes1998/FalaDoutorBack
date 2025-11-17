// backend/src/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const medicoRoutes = require('./routes/medicoRoutes');
const planoSaudeRoutes = require('./routes/planoSaudeRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('API Fala Doutor está rodando!');
})


app.use('/medicos', medicoRoutes);
app.use('/planos-saude', planoSaudeRoutes);
app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
