const express = require('express');
const ConsultaController = require('../controllers/consultaController');

const router = express.Router();

router.get('/', ConsultaController.listar);
router.get('/:id', ConsultaController.buscarPorId);
router.post('/', ConsultaController.criar);
router.put('/:id', ConsultaController.atualizar);
router.delete('/:id', ConsultaController.remover);

module.exports = router;