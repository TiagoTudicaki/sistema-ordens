const ordemModel = require("../models/ordemModel");

const ordemService = {
    
  async criar(dados) {
    const ordem = await ordemModel.criar(dados);

    return ordem;
  },

  async listar() {
    const ordens = await ordemModel.listar();
    return ordens;
  },

  async buscarPorId(id) {
    const ordem = await ordemModel.buscarPorId(id);
    return ordem;
  },

  async atualizar(id, dados) {
    const ordem = await ordemModel.atualizar(id, dados);
    return ordem;
  },

  async excluir(id) {
    const ordem = await ordemModel.excluir(id);
    return ordem;
  },
};

module.exports = ordemService;
