const equipamentoModel = require("../models/equipamentoModel");
const {
  validarId,
  validarIdentificador,
  validarCamposVazios,
  validarTextoSimples,
  validarCampoEnumTipo,
  validarTextoSimplesOpcional
} = require("../utils/validarCampos");
const {  
  padronizarTexto,
  padronizarCapacidade,
  padronizarTipoDeGas,
  
} = require("../utils/padronizarDados");

const {consultaFiltrada} = require("../utils/filtragemDeConsulta");

const equipamentoService = {
  async criar(dados) {

    
    const camposExistentes = consultaFiltrada(dados);

    

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
    } = camposExistentes;

    const camposVazios = validarCamposVazios({cliente_id, local, identificador});
    

    if(camposVazios.length > 0){
      throw new Error(`O(s) campo(s) ${camposVazios.join(", ")} são obrigátorio(s)`);
    }

    //----Cliente_id-----

    const cliente_idValido = validarId(cliente_id);

   


   //------Local-------

   const localValido = /^[A-Za-zÀ-ÿ\s']+$/.test(local);

   if(!localValido){
    throw new Error("Local deve possuir apenas letra, espaço, apostrofo");
   }

   //-----Identificador------

   const identificadorTexto = String(identificador);

   if(identificadorTexto.length != 2){
    throw new Error("Identificador deve possuir 2 digitos");
   }
   const identificadorValido = /^[0-9]+$/.test(identificadorTexto);

   if(!identificadorValido){
    throw new Error("Identificador deve possuir apenas números");
   }

   //----Marca------

   if(marca != null){
    const marcaValida = /^[A-Za-zÀ-ÿ\s']+$/.test(marca);
    if(!marcaValida){
      throw new Error("Marca de possuir apenas letra,espaço e apostrofos");
    }
   }

   //-----Modelo--------

   if(modelo != null){
    const modeloValido = /^[A-Za-zÀ-ÿ0-9\s-]+$/.test(modelo);
    if(!modeloValido){
      throw new Error("Modelo não deve possuir caracteres especiais ou ponto");
    }
   }

   //------Serie------

   if(serie != null){
    const serieValida =  /^[A-Za-zÀ-ÿ0-9\s-]+$/.test(serie);
    if(!serieValida){
      throw new Error("Serie não dever possuir caracteres especiais ou ponto");
      
    }
   }

   //-----Capacidade_btu------

   if(capacidade_btu != null){
    const capacidade_btuValido = /^[A-Za-zÀ-ÿ0-9\s.]+$/.test(capacidade_btu);
    if(!capacidade_btuValido){
      throw new Error("Capacidade não possuir caracteres especiais e traços");
    }
   }

   //----Tipo_gas------

   if(tipo_gas != null){
    const tipo_gasValido = /^[A-Za-zÀ-ÿ0-9\-]+$/.test(tipo_gas);
    if(!tipo_gasValido){
      throw new Error("O tipo do gas não deve possuir espaço ou caracteres especiais ou pontos");
   }
  }
   const camposComDados = {};

   camposComDados.cliente_id = cliente_idValido;
   if(tipo != null){
    camposComDados.tipo = validarCampoEnumTipo(tipo);
   }
   camposComDados.local = padronizarTexto(local);
   camposComDados.identificador = identificadorTexto;
   if(marca != null){
    camposComDados.marca = padronizarTexto(marca);
   }
   if(modelo != null){
    camposComDados.modelo = modelo;
   }
   if(serie != null){
    camposComDados.serie = serie;
   }
   if(capacidade_btu != null){
    camposComDados.capacidade_btu = padronizarCapacidade(capacidade_btu);
   }
   if(tipo_gas != null){
    camposComDados.tipo_gas = padronizarTipoDeGas(tipo_gas);
   }


   const equipamento = await equipamentoModel.criar(camposComDados);
   return equipamento;
   
   },
  

  async listar(campos) {

    const camposExistentes = consultaFiltrada(campos);

    
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
