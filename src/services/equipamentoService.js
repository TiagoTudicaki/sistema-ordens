const equipamentoModel = require("../models/equipamentoModel");

const equipamentoService = {

  async criar(dados) {
    const equipamento = await equipamentoModel.criar(dados);
    return equipamento;
  },

  async listar() {
    const equipamentos = await equipamentoModel.listar();
    return equipamentos;
  },

  async buscarPorId(id) {
    const equipamento = await equipamentoModel.buscarPorId(id);
    return equipamento;
  },

  async atualizar(id, dados) {
    const equipamento = await equipamentoModel.atualizar(id, dados);
    return equipamento;
  },

  async excluir(id) {
    const equipamento = await equipamentoModel.excluir(id);
    return equipamento;
  },
};

module.exports = equipamentoService;
