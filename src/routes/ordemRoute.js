const express = require('express');
const ordemController = require('../controllers/ordemController');
const router = express.Router();

router.post('/ordens',ordemController.criar);
router.get('/ordens', ordemController.listar);
router.get('/ordens/:id',ordemController.buscarPorId);
router.put('/ordens/:id',ordemController.atualizar);
router.delete('/ordens/:id',ordemController.excluir);

module.exports = router;