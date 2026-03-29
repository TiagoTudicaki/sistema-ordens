const express = require("express");
const tecnicoController = require("../controllers/tecnicoController");
const router = express.Router();

router.post('/tecnicos', tecnicoController.criar);
router.get('/tecnicos', tecnicoController.listar);
router.get('/tecnicos', tecnicoController.buscarPorId);
router.put('/tecnicos/:id', tecnicoController.atualizar);
router.delete('/tecnicos/:id', tecnicoController.excluir);

module.exports = router;