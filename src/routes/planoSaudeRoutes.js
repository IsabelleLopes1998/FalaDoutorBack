const express = require('express');
const PlanoSaudeController = require('../controllers/planoSaudeController');

const router = express.Router();

router.get('/', PlanoSaudeController.listar);
router.get('/:id', PlanoSaudeController.buscarPorId);
router.post('/', PlanoSaudeController.criar);
router.put('/:id', PlanoSaudeController.atualizar);
router.delete('/:id', PlanoSaudeController.remover);

module.exports = router;