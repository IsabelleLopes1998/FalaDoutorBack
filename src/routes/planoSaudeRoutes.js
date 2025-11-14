const express = require('express');
const PlanoSaudeController = require('../controllers/planoSaudeController');

const router = express.Router();

router.get('/', PlanoSaudeController.listar);

module.exports = router;