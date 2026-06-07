const tecnicoModel = require("../models/tecnicoModel");
const { padronizarTexto } = require("../utils/padronizarDados");
const {validarCamposVazios} = require("../utils/validarCampos");

const tecnicoService = {
  async criar(dados) {
   const {nome, cargo, matricula, telefone} = dados;


  const camposVazios = validarCamposVazios({nome, cargo, matricula, telefone});

    

  if(camposVazios.length > 0){
  throw new Error(`O(s) campo(s) ${camposVazios.join(', ')} são obrigatorio(s)`)
 }

//-----Nome------
    if(typeof nome !== "string"){
      throw new Error("Nome deve ser texto");
    }

    const nomeProcessado = nome.trim();

    if(!nomeProcessado){
      throw new Error("Nome não pode ser vazio");
    }


    const nomeValido = /^[A-Za-zÀ-ÿ\s']+$/.test(nomeProcessado);

    if(!nomeValido){
      throw new Error("Nome deve possuir apenas letra, espaço e apostrofo")
    }

     const nomePadronizado = padronizarTexto(nomeProcessado);

    //----Cargo----



   




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
