const clienteModel = require("../models/clienteModel");
const { validarIdPositivoInt, validarNome, validarCpf, validarTelefone, validarEndereco, validarCidade } = require("../utils/validarCampos");
const {
  padronizarTexto,
  padronizarEndereco,
  padronizarCidade,
} = require("../utils/padronizarDados");
const { consultaFiltrada } = require("../utils/filtragemDeConsulta");
const { end } = require("../config/database");

const clienteService = {
  async criar(camposWhiteList) {
    
    const dadosValidos = {
      nome: padronizarTexto(validarNome(camposWhiteList.nome)),
      cpf: validarCpf(camposWhiteList.cpf),
      telefone: validarTelefone(camposWhiteList.telefone),
      endereco: padronizarEndereco(validarEndereco(camposWhiteList.endereco)),
      cidade: padronizarTexto(validarCidade(camposWhiteList.cidade)),
    }

    try {
      return await clienteModel.criar(dadosValidos);
    } catch (erro) {
      if (erro.code === "ER_DUP_ENTRY") {
        const erroCustom = new Error("CPF já cadastrado");
        erroCustom.status = 409;
        throw erroCustom;
      }
      throw erro;
    }
  },
  async listar(campos) {
    const filtrosValidos = consultaFiltrada(campos);

    const { nome, cpf, telefone, endereco, cidade } = filtrosValidos;

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

    //----CPF------

    if (cpf != null) {
      if (typeof cpf !== "string") {
        throw new Error("Cpf inválido");
      }

      const cpfValido = /^[\d\s.-]+$/.test(cpf);
      if (!cpfValido) {
        throw new Error(
          "CPF inválido: cpf deve conter apenas (número, ponto e traço)",
        );
      }
    }

    //----Telefone----

    if (telefone != null) {
      if (typeof telefone !== "string") {
        throw new Error("Telefone inválido");
      }

      const telefoneValido = /^[\d\s.()-]+$/.test(telefone);

      if (!telefoneValido) {
        throw new Error(
          "Telefone deve conter apenas número, parentes, ponto e traço",
        );
      }
    }

    //----Endereço------

    if (endereco != null) {
      if (typeof endereco !== "string") {
        throw new Error("Endereço inválido");
      }

      const enderecoValido = /^[A-Za-zÀ-ÿ0-9\s',.-]+$/.test(endereco);

      if (!enderecoValido) {
        throw new Error(
          "Endereço dever conter apenas letra, número, espaço, vírgula, ponto, hífen e apostrofo",
        );
      }
    }

    //-----Cidade----

    if (cidade != null) {
      if (typeof cidade !== "string") {
        throw new Error("Cidade inválida");
      }

      const cidadeValida = /^[A-Za-zÀ-ÿ\s']+$/.test(cidade);

      if (!cidadeValida) {
        throw new Error("Cidade deve conter apenas letra, espaços e apóstrofo");
      }
    }

    const filtrosNormalizados = {};

    if (nome != null) filtrosNormalizados.nome = padronizarTexto(nome);
    if (cpf != null) filtrosNormalizados.cpf = cpf.replace(/\D/g, "");
    if (telefone != null)
      filtrosNormalizados.telefone = telefone.replace(/\D/g, "");
    if (endereco != null)
      filtrosNormalizados.endereco = padronizarEndereco(endereco);
    if (cidade != null) filtrosNormalizados.cidade = padronizarCidade(cidade);

    if (filtrosNormalizados.cpf && filtrosNormalizados.cpf.length !== 11) {
      throw new Error("CPF deve conter 11 dígitos");
    }
    const clientes = await clienteModel.listar(filtrosNormalizados);

    return clientes;
  },

  async buscarPorId(clienteId) {
    if (!validarIdPositivoInt(clienteId)) {
      throw new Error("ID inválido");
    }

    const resultado = await clienteModel.buscarPorId(clienteId);

    if (!resultado) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return resultado;
  },

  async atualizar(clienteId, dados) {
    const filtrosValidos = consultaFiltrada(dados);

    const { nome, cpf, telefone, endereco, cidade } = filtrosValidos;

    let nomeProcessado;
    if (nome != null) {
      nomeProcessado = String(nome).trim();
      const nomeValido = /^[A-Za-zÀ-ÿ\s']+$/.test(nomeProcessado);
      if (!nomeValido) {
        throw new Error("Nome dever possuir apenas letra, espaço e acento");
      }
    }

    let cpfProcessado;

    if (cpf != null) {
      if (typeof cpf !== "string") {
        throw new Error("Cpf inválido");
      }
      cpfProcessado = cpf.trim();
      const cpfValido = /^[\d\s.-]+$/.test(cpfProcessado);
      if (!cpfValido) {
        throw new Error(
          "CPF inválido: cpf deve conter apenas (número, ponto e traço)",
        );
      }
    }

    let telefoneProcessado;

    if (telefone != null) {
      if (typeof telefone !== "string") {
        throw new Error("Telefone inválido");
      }
      telefoneProcessado = telefone.trim();
      const telefoneValido = /^[\d\s.()-]+$/.test(telefoneProcessado);
      if (!telefoneValido) {
        throw new Error(
          "Telefone deve conter apenas número, parentes, ponto e traço",
        );
      }
    }

    let enderecoProcessado;

    if (endereco != null) {
      enderecoProcessado = String(endereco).trim();
      const enderecoValido = /^[A-Za-zÀ-ÿ0-9\s',.-]+$/.test(enderecoProcessado);
      if (!enderecoValido) {
        throw new Error(
          "Endereço dever conter apenas letra, número, espaço, vírgula, ponto, hífen e apostrofo",
        );
      }
    }

    let cidadeProcessada;

    if (cidade != null) {
      cidadeProcessada = String(cidade).trim();
      const cidadeValida = /^[A-Za-zÀ-ÿ\s']+$/.test(cidadeProcessada);

      if (!cidadeValida) {
        throw new Error("Cidade deve conter apenas letra, espaços e apóstrofo");
      }
    }

    const filtrosNormalizados = {};

    if (nomeProcessado)
      filtrosNormalizados.nome = padronizarTexto(nomeProcessado);
    if (cpfProcessado)
      filtrosNormalizados.cpf = cpfProcessado.replace(/\D/g, "");
    if (telefoneProcessado)
      filtrosNormalizados.telefone = telefoneProcessado.replace(/\D/g, "");
    if (enderecoProcessado)
      filtrosNormalizados.endereco = padronizarEndereco(enderecoProcessado);
    if (cidadeProcessada)
      filtrosNormalizados.cidade = padronizarCidade(cidadeProcessada);

    if (filtrosNormalizados.cpf && filtrosNormalizados.cpf.length !== 11) {
      throw new Error("CPF deve conter 11 dígitos");
    }

    if (filtrosNormalizados.telefone) {
      if (
        filtrosNormalizados.telefone.length < 10 ||
        filtrosNormalizados.telefone.length > 11
      ) {
        throw new Error("Telefone deve conter 10 ou 11 dígitos");
      }
    }

    const resultado = await clienteModel.atualizar(
      clienteId,
      filtrosNormalizados,
    );

    if (resultado.affectedRows === 0) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }
    return { clienteId, ...filtrosNormalizados };
  },

  async excluir(clienteId) {
    if (!validarIdPositivoInt(clienteId)) {
      throw new Error("ID inválido");
    }
    const resultado = await clienteModel.excluir(clienteId);

    if (resultado.affectedRows === 0) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return { mensagem: "Cliente excluído com sucesso" };
  },
};

module.exports = clienteService;
