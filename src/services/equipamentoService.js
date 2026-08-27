const equipamentoModel = require("../models/equipamentoModel");
const {
  validarId,
  validarIdentificador,
  validarCamposVazios,
  validarTextoSimples,
  validarCampoEnumTipo,
  validarTextoSimplesOpcional,
  validarLocal,
  validarMarca,
  validarModelo,
  validarSerie,
} = require("../utils/validarCampos");
const {  
  padronizarTexto,
  padronizarCapacidade,
  padronizarTipoDeGas,
  padronizarModelo,
  padronizarSerie,
  
} = require("../utils/padronizarDados");

const {consultaFiltrada} = require("../utils/filtragemDeConsulta");
const valoresTrimados = require("../utils/sanitizarDados");

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
  

  async listar(camposExistentes) {

  
  const equipamentos = await equipamentoModel.listar(camposExistentes);
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

  async atualizar(id, camposExistentes) {
    
    if(Object.keys(camposExistentes).length === 0){
      const erro = new Error("É necessário alterar pelos menos um campo");
      erro.status = 400;
      throw erro;
    } 

    const camposTrimados = valoresTrimados(camposExistentes);
    
    const dados = {};

    if(camposTrimados.cliente_id != null){
      dados.cliente_id = validarId(camposTrimados.cliente_id);
    }

    if(camposTrimados.tipo !=  null){
      dados.tipo = validarCampoEnumTipo(camposTrimados.tipo);
    }

    if(camposTrimados.local != null){
      dados.local = padronizarTexto(validarLocal(camposTrimados.local));
    }

    if(camposTrimados.identificador != null){
      dados.identificador = validarIdentificador(camposTrimados.identificador);
    }

    if(camposTrimados.marca != null){
      dados.marca = padronizarTexto(validarMarca(camposTrimados.marca));
    }

    if(camposTrimados.modelo != null){
      dados.modelo = validarModelo(camposTrimados.modelo);
    }

    if(camposTrimados.serie != null){
      dados.serie = validarSerie(camposTrimados.serie);
    } 

    if(camposTrimados.capacidade_btu != null){
      dados.capacidade_btu = padronizarCapacidade(camposTrimados.capacidade_btu);
    }

    if(camposTrimados.tipo_gas != null){
      dados.tipo_gas = padronizarTipoDeGas(camposTrimados.tipo_gas);
    }

    const equipamento = await equipamentoModel.atualizar(id, dados);
    return equipamento;

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
