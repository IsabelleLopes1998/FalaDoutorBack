const express = require('express');
const PacienteController = require('../controllers/pacienteController')
const router = express.Router();

router.get('/', PacienteController.listar);
router.get('/:id', PacienteController.buscarPorId);
router.post('/', PacienteController.criar);
router.put('/:id', PacienteController.atualizar);
router.delete('/:id', PacienteController.remover);

module.exports = router