const equipamentoModel = require("../models/equipamentoModel");
const{validarIdPositivoInt, validarIdentificador, validarCamposVazios, validarTextoSimples} = require("../utils/validarCampos");
const {sanitizarTextoOpcionais} = require("../utils/padronizarDados");

const equipamentoService = {
  async criar(dados) {

    if(!dados || typeof dados !== "object"){
      throw new Error("Requisição inválida");
    }
    const { 
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        capacidade_btu,
        tipo_gas, 
      } 
      = dados;

      const clienteIdNumero = Number(cliente_id);

      if(Number.isNaN(clienteIdNumero)){
        throw new Error("ID deve ser numero");
      }


    if(!validarIdPositivoInt(clienteIdNumero)){
      throw new Error("ID inválido");
    }

    if(tipo !== undefined && tipo !== null && typeof tipo !== "string"){
      throw new Error("tipo inválido");
    }

    const tipoLimpo = sanitizarTextoOpcionais(tipo);

    if(!validarTextoSimples(tipo)){
      
    }



    if (!validarIdentificador(identificador)) {
      const erro = new Error(
        "Identificador deve ser número de 1 a 4 dígitos (1, 15, 123)",
      );
      erro.status = 400;
      throw erro;
    }

    dados.tipo = dados.tipo?.trim().toLowerCase();
    dados.local = dados.local?.trim().toLowerCase();
    dados.marca = dados.marca?.trim().toLowerCase();
    dados.modelo = dados.modelo?.trim().toLowerCase();
    dados.serie = dados.serie?.trim().toLowerCase();
    dados.capacidade_btu = dados.capacidade_btu?.trim().toLowerCase();
    dados.tipo_gas = dados.tipo_gas?.trim().toLowerCase();

    try {
      const equipamento = await equipamentoModel.criar(dados);
      return equipamento;
    } catch (erro) {
      if (erro.code === "ER_DUP_ENTRY") {
        const erroCustom = new Error(
          `Equipamento "${dados.identificador}" já existe no "${dados.local}"`,
        );
        erroCustom.status = 409;
        throw erroCustom;
      }

      throw erro;
    }
  },

  async listar() {
    const equipamentos = await equipamentoModel.listar();
    return equipamentos;
  },

  async buscarPorId(id) {
    const equipamento = await equipamentoModel.buscarPorId(id);
    if (!equipamento) {
      const erro = new Error("Equipamento não encontrado");
      erro.status = 404;
      throw erro;
    }
    return equipamento;
  },

  async atualizar(id, dados) {
    dados.tipo = dados.tipo?.trim().toLowerCase();
    dados.local = dados.local?.trim().toLowerCase();
    dados.marca = dados.marca?.trim().toLowerCase();
    dados.modelo = dados.modelo?.trim().toLowerCase();
    dados.serie = dados.serie?.trim().toLowerCase();
    dados.capacidade_btu = dados.capacidade_btu?.trim().toLowerCase();
    dados.tipo_gas = dados.tipo_gas?.trim().toLowerCase();

    const { identificador } = dados;
    if (identificador?.trim() && !/^\d{1,4}$/.test(identificador.trim())) {
      throw { status: 400, message: "Número 1-4 dígitos" };
    }

    return await equipamentoModel.atualizar(id, dados);
  },

  async excluir(id) {
    const equipamento = await equipamentoModel.excluir(id);
    if (!equipamento) {
      const erro = new Error("Equipamento não encontrado");
      erro.status = 404;
      throw erro;
    }
    return equipamento;
  },
};

module.exports = equipamentoService;
