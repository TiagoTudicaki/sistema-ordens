const precoModel = require("../models/precoModel");

const precoService = {
    
  async criar(dados) {
    const preco = await precoModel.criar(dados);
    return preco;
  },

  async listar() {
    const precos = await precoModel.listar();
    return precos;
  },

  async buscarPorId(id) {
    const preco = await precoModel.buscarPorId(id);
    return preco;
  },

  async atualizar(id, dados) {
    const preco = await precoModel.atualizar(id, dados);
    return preco;
  },

  async excluir(id) {
    const preco = await precoModel.excluir(id);

    return preco;
  },
};

module.exports = precoService;
