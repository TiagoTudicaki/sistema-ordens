const clienteModel = require("../models/clienteModel");

const clienteService = {
    
  async criar(dados) {
    const cliente = await clienteModel.criar(dados);
    return cliente;
  },

  async listar() {
    const clientes = await clienteModel.listar();

    return clientes;
  },

  async buscarPorId(id) {
    const cliente = await clienteModel.buscarPorId(id);

    if (!cliente) throw new Error("Cliente não encontrado");

    return cliente;
  },

  async atualizar(id, dados) {
    const cliente = await clienteModel.atualizar(id, dados);
    return cliente;
  },

  async excluir(id) {
    const cliente = await clienteModel.excluir(id);
    return cliente;
  },
};

module.exports = clienteService;
