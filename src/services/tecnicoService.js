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

    if(typeof cargo !== "string"){
  throw new Error("Cargo deve ser texto");
}

const cargoProcessado = cargo.trim();

if(!cargoProcessado){
  throw new Error("Cargo não pode ser vazio");
}
const cargoValido = /^[A-Za-zÀ-ÿ\s]+$/.test(cargoProcessado);

if(!cargoValido){
  throw new Error("Cargo deve possuir apenas letra,acento e espaço");
}

const cargoPadronizado = padronizarTexto(cargoProcessado);

//----Matricula-----

if(typeof matricula !== "string"){
  throw new Error("Matricula deve ser apenas texto")
}

const matriculaProcessada = matricula.trim();

if(!matriculaProcessada){
  throw new Error("Matricula não pode ser vazia");
}
const matriculaValida = /^[\d\s]+$/.test(matriculaProcessada);

if(!matriculaValida){
  throw new Error("Matricula deve possuir apenas numeros");
}

const matriculaPadronizada = matriculaProcessada.replace(/\s+/g, "");

if(matriculaPadronizada.length !== 3){
  throw new Error("Matricula deve possuir apenas 3 digitos");
}

//-----Telefone----

if(typeof telefone !== "string"){
  throw new Error("Formato de telefone inválido");
}

const telefoneProcessado = telefone.trim();

if(!telefoneProcessado){
  throw new Error("Telefone não pode ser vazio");
}

const telefoneValido = /^[\d\s()-]+$/.test(telefoneProcessado);

if(!telefoneValido){
  throw new Error("Telefone deve possuir apenas números, parênteses e traços");
}

const telefonePadronizado = telefoneProcessado.replace(/\D/g, "");

if (telefonePadronizado.length !== 10 && telefonePadronizado.length !== 11) {
      throw new Error("Telefone deve conter 10 ou 11 dígitos");
    }

      const tecnico = {
        nome:nomePadronizado,
        cargo: cargoPadronizado,
        matricula: matriculaPadronizada,
        telefone: telefonePadronizado
      }

      return await tecnicoModel.criar(tecnico);

  },

  async listar(campos) {

     const filtrosValidos = consultaFiltrada(campos);

    const { nome, cargo, matricula, telefone } = filtrosValidos;

    //-----NOME--------

    if (nome != null) {
      if (typeof nome !== "string") {
        throw new Error("Nome inválido");
      }

      const nomeValido = /^[A-Za-zÀ-ÿ\s']+$/.test(nome);

      if (!nomeValido) {
        throw new Error("Nome deve conter apenas letras e espaços");
      }
    }

    //----CARGO------

    if (cargo != null) {
      if (typeof cargo !== "string") {
        throw new Error("Cargo inválido");
      }

      const cargoValido = /^[A-Za-zÀ-ÿ\s']+$/.test(cargo);

      if (!cargoValido) {
        throw new Error("Cargo deve conter apenas letras e espaços");
      }
    }

    //----MATRICULA----

    if (matricula != null) {
      if (typeof matricula !== "string") {
        throw new Error("Matrícula inválida");
      }

      const matriculaValida = /^[\d\s]+$/.test(matricula);

      if (!matriculaValida) {
        throw new Error("Matrícula deve conter apenas números e espaços");
      }

    }

    //----TELEFONE----

    if (telefone != null) {
      if (typeof telefone !== "string") {
        throw new Error("Telefone inválido");
      }

      const telefoneValido = /^[\d\s()-]+$/.test(telefone);

      if (!telefoneValido) {
        throw new Error(
          "Telefone deve conter apenas número, parênteses e traço",
        );
      }
    }

    const filtrosNormalizados = {};

    if (nome != null) filtrosNormalizados.nome = padronizarTexto(nome);
    if (cargo != null) filtrosNormalizados.cargo = padronizarTexto(cargo);
    if (matricula != null)
      filtrosNormalizados.matricula = matricula.replace(/\s/g, "");
    if (telefone != null)
      filtrosNormalizados.telefone = telefone.replace(/\D/g, "");

    if(filtrosNormalizados.matricula){
         if(filtrosNormalizados.matricula.length != 3){
        throw new Error("Matricula deve possuir 3 digitos");
    }
    }

    if (filtrosNormalizados.telefone) {
      if (
        filtrosNormalizados.telefone.length < 10 ||
        filtrosNormalizados.telefone.length > 11
      ) {
        throw new Error("Telefone deve conter 10 ou 11 dígitos");
      }
    }

    const tecnicos = await tecnicoModel.listar(filtrosNormalizados);
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
