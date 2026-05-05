const equipamentoModel = require("../models/equipamentoModel");
const {
  validarIdPositivoInt,
  validarIdentificador,
  validarCamposVazios,
  validarTextoSimples,
  validarTipoDeAr,
  validarTextoSimplesOpcional
} = require("../utils/validarCampos");
const {
  sanitizarTextoOpcionais,
  padronizarTipoAr,
  sanitizarTextoObrigatorios,
  padronizarTexto,
  padronizarCamposOpcionais,
  padronizarLetrasNumeros
} = require("../utils/padronizarDados");

const equipamentoService = {
  async criar(dados) {
    if (!dados || typeof dados !== "object") {
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
    } = dados;

    const clienteIdNumero = Number(cliente_id);

    if (Number.isNaN(clienteIdNumero)) {
      throw new Error("ID deve ser numero");
    }

    if (!validarIdPositivoInt(clienteIdNumero)) {
      throw new Error("ID inválido");
    }

    if (tipo !== null && typeof tipo !== "string") {
      throw new Error("Campo 'tipo' deve ser texto");
    }

    const tipoLimpo = sanitizarTextoOpcionais(tipo);

    const tipoPadronizado = padronizarTipoAr(tipoLimpo);

    

    if (!validarTipoDeAr(tipoPadronizado)) {
      throw new Error(`Tipo '${tipoPadronizado}' não existe. use : ${tipoValidos.join(", ")}`);
    }

    if (typeof local !== "string") {
      throw new Error("Local deve ser texto");
    }

    const localLimpo = sanitizarTextoObrigatorios(local);

    if (localLimpo === "") {
      throw new Error("Local não pode ser vazio");
    }

    if (!validarTextoSimples(localLimpo)) {
      throw new Error("Local não deve possuir numeros");
    }

    const localPadronizado = padronizarTexto(localLimpo);

    if(identificador == null){
      throw new Error("Identificador é obrigatório");
    }

    const identificadorStr = String(identificador);

    const identificadorLimpo = sanitizarTextoObrigatorios(identificadorStr);

    if(identificadorLimpo === ""){
      throw new Error("Identificador não pode ser vazio");
    }

    if (!validarIdentificador(identificadorLimpo)) {
      const erro = new Error(
        "Identificador deve ser número de 1 a 4 dígitos (1, 15, 123)",
      );
      erro.status = 400;
      throw erro;
    }

    if(marca !== null && typeof marca !== "string"){
      throw new Error("Marca inválida");
    }

    const marcaLimpo = sanitizarTextoOpcionais(marca);

    if(!validarTextoSimplesOpcional(marcaLimpo)){
      throw new Error("Marca não poder ser numeros");
    }

    const marcaPadronizada = padronizarCamposOpcionais(marcaLimpo);

    if(modelo !== null && typeof modelo !== "string" && typeof modelo !== "number"){
      throw new Error("Modelo inválido");
    }


    const modeloStr = String(modelo);

    const modeloLimpo = sanitizarTextoOpcionais(modeloStr);

    const modeloPadronizado = padronizarLetrasNumeros(modeloLimpo);

    if(serie !== null && typeof serie !== "string" && typeof serie !== "number"){
      throw new Error("O campo 'serie' deve ser apenas numero, texto e nulo");
    }
    
    const serieStr = String(serie);

    const serieLimpo = sanitizarTextoOpcionais(serieStr);

    const seriePadronizada = padronizarLetrasNumeros(serieLimpo);

    if(capacidade_btu !== null && typeof capacidade_btu !== "string" && typeof capacidade_btu !== "number"){
      throw new Error("O campo 'capacidade_btu' deve ser apenas texto, numeros ou nulo");
    } 

    const capacidadeBtuStr = String(capacidade_btu);

    const capacidadeBtuLimpo = sanitizarTextoOpcionais(capacidadeBtuStr);

    



  



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
