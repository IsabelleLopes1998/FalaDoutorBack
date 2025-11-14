const express = require('express');

const MedicoController = require('../controllers/medicoController');

const router = express.Router();


router.get('/', MedicoController.listar);
router.get('/:id', MedicoController.buscarPorId);
router.post('/', MedicoController.criar);
router.put('/:id', MedicoController.atualizar);
router.delete('/:id', MedicoController.remover);

module.exports = router;