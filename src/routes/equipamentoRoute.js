const express = require('express')
const equipamentoController = require('../controllers/equipamentoController');
const e = require('express');
const router = express.Router();

router.post('/equipamentos', equipamentoController.criar);
router.get('/equipamentos', equipamentoController.listar);
router.get('/equipamentos/:id', equipamentoController.buscarPorId);
router.put('/equipamentos/:id', equipamentoController.atualizar);
router.delete('/equipamentos/:id', equipamentoController.excluir);

module.exports = router;