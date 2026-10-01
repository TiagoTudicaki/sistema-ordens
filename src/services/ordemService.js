const ordemModel = require("../models/ordemModel");
const {
  validarId,
  validarCampoEnum,
  validarTextoLivre,
  validarCamposObrigatorios,
} = require("../utils/validarCampos");


const ordemService = {
  async criar(dados) {
    const camposObrigatorios = ["cliente_id", "problema"];

    const campos = validarCamposObrigatorios(dados, camposObrigatorios);

    const{cliente_id, problema} = campos;

    const clienteIdValido = validarId(cliente_id);

    if(typeof problema !== "string"){
      throw new Error("Problema deve ser texto");
    }

    const problemaTrimado = problema.trim();

    if(problemaTrimado === ""){
      throw new Error("Problema não pode ser uma string vazia");
    }

    const dadosValidados = {
      cliente_id: clienteIdValido,
      problema: problemaTrimado,
    }

    const ordem = await ordemModel.criar(dadosValidados);
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
