const tecnicoModel = require("../models/tecnicoModel");

const tecnicoService = {
  async criar(dados) {
    const tecnico = await tecnicoModel.criar(dados);

    return tecnico;
  },

  async listar() {
    const tecnicos = await tecnicoModel.listar();
    return tecnicos;
  },

  async buscarPorId(id) {
    const tecnico = await tecnicoModel.buscarPorId(id);
    return tecnico;
  },

  async atualizar(id, dados) {
    const tecnico = await tecnicoModel.atualizar(id, dados);
    return tecnico;
  },

  async excluir(id) {
    const tecnico = await tecnicoModel.excluir(id);

    return tecnico;
  },
};

module.exports = tecnicoService;
