const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

router.post('/clientes', clienteController.criar);
router.get('/clientes',clienteController.listar);
router.get('/clientes/:id', clienteController.buscarPorId);
router.put('/clientes/:id',clienteController.atualizar);
router.delete('/clientes/:id',clienteController.excluir);

module.exports = router;