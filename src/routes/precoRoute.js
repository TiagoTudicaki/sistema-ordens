const express = require("express");
const precoController = require("../controllers/precoController");
const router = express.Router();

router.post("/precos", precoController.criar);
router.get("/precos", precoController.listar);
router.get("/precos/:id", precoController.buscarPorId);
router.put("/precos/:id", precoController.atualizar);
router.delete("/precos/:id", precoController.excluir);

module.exports = router;
