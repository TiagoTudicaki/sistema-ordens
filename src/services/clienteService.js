const clienteModel = require("../models/clienteModel");
const {
  validarIdPositivoInt,
} = require("../utils/validarCampos");
const {
  padronizarTexto,
  padronizarEndereco,
  padronizarCidade,
} = require("../utils/padronizarDados");
const {
  consultaFiltrada,
} = require("../utils/filtragemDeConsulta");

const clienteService = {
  async criar(dados) {
    /**
     * Cria um cliente garantindo:
     * - validação de tipo dos dados de entrada
     * - sanitização (remoção de espaços e caracteres desnecessários)
     * - padronização (formatação consistente dos dados)
     * - validação das regras de negócio
     * - tratamento de erro para CPF duplicado no banco
     */

    if (!dados || typeof dados !== "object") {
      throw new Error("Requisição inválida");
    }

    const { nome, cpf, telefone, endereco, cidade } = dados;

    // --- NOME ---
    if (typeof nome !== "string") {
      throw new Error("Nome deve ser texto");
    }

    const nomeProcessado = nome.trim();

    if (!nomeProcessado) {
      throw new Error("Nome não pode ser vazio");
    }

    const nomeLimpo = nomeProcessado.replace(/\s+/g, " ");

    const nomePadronizado = padronizarTexto(nomeLimpo);

    const nomeValido = /^[A-Za-zÀ-ÿ\s']+$/.test(nomePadronizado);

    if (!nomeValido) {
      throw new Error("Nome deve possuir apenas letras e espaços");
    }

    // --- CPF ---
    if (typeof cpf !== "string") {
      throw new Error("Erro: CPF só pode ser do tipo texto");
    }

    const cpfProcessado = cpf.trim();

    if (!cpfProcessado) {
      throw new Error("Cpf não pode ser vazio");
    }

    const cpfValido = /[^\d\s.-]/.test(cpfProcessado);

    if (cpfValido) {
      throw new Error("CPF não deve conter letras ou caracteres especiais");
    }

    const cpfLimpo = cpfProcessado.replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      throw new Error("CPF deve conter 11 digistos");
    }

    // --- TELEFONE ---

    if (typeof telefone !== "string") {
      throw new Error("Telefone Dever ser apenas texto");
    }

    const telefoneProcessado = telefone.trim();


    if (!telefoneProcessado) {
      throw new Error("Telefone não pode ser vazio");
    }

    const contemCaracterInvalido = /[^\d\s\-()]/.test(telefoneProcessado);

    if (contemCaracterInvalido) {
      throw new Error("Telefone só deve possuir numeros, traços e parenteses");
    }

    const telefoneLimpo = telefoneProcessado.replace(/\D/g, "");

    if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {
      throw new Error("Telefone deve conter 10 ou 11 dígitos");
    }

    // --- ENDEREÇO ---
    if (typeof endereco !== "string") {
      throw new Error("Endereço deve ser do tipo texto");
    }

    const enderecoProcessado = endereco.trim();

    if (!enderecoProcessado) {
      throw new Error("Endereço não pode ser vazio");
    }

    const enderecoPadronizado = padronizarEndereco(enderecoProcessado);

    // --- CIDADE ---
    if (typeof cidade !== "string") {
      throw new Error("Cidade deve ser do tipo texto");
    }

    const cidadeProcessada = cidade.trim();

    if (!cidadeProcessada) {
      throw new Error("Cidade não pode ser vazia");
    }

    const cidadeValida = /^[A-Za-zÀ-ÿ\s']+$/.test(cidadeProcessada);

    if (!cidadeValida) {
      throw new Error("Cidade deve possuir apenas letras e espaços");
    }

    const cidadePadronizada = padronizarCidade(cidadeProcessada);

    // Objeto final já limpo, padronizado e validado
    const cliente = {
      nome: nomePadronizado,
      cpf: cpfLimpo,
      telefone: telefoneLimpo,
      endereco: enderecoPadronizado,
      cidade: cidadePadronizada,
    };

    try {
      return await clienteModel.criar(cliente);
    } catch (erro) {
      // Trata erro de chave única (CPF duplicado)
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

    let nomeProcessado;

    if (nome != null) {
      nomeProcessado = String(nome).trim();
      const nomeValido = /^[A-Za-zÀ-ÿ\s']+$/.test(nomeProcessado);

      if (!nomeValido) {
        throw new Error("Nome deve conter apenas letras e espaços");
      }
    }

    //----CPF------

    let cpfProcessado;

    if (cpf != null) {
      if(typeof cpf !== "string"){
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

    //----Telefone----

    let telefoneProcessado;
    if (telefone != null) {
      if(typeof telefone !== "string"){
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

    //----Endereço------

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

    //-----Cidade----

    let cidadeProcessada;
    if (cidade != null) {
      cidadeProcessada = String(cidade).trim();

      const cidadeValida = /^[A-Za-zÀ-ÿ\s']+$/.test(cidadeProcessada);

      if (!cidadeValida) {
        throw new Error("Cidade deve conter apenas letra, espaços e apóstrofo");
      }
    }

    const filtrosNormalizados = {};

    if (nome != null)
      filtrosNormalizados.nome = padronizarTexto(nomeProcessado);
    if (cpf != null) filtrosNormalizados.cpf = cpfProcessado.replace(/\D/g, "");
    if (telefone != null)
      filtrosNormalizados.telefone = telefoneProcessado.replace(/\D/g, "");
    if (endereco != null)
      filtrosNormalizados.endereco = padronizarEndereco(enderecoProcessado);
    if (cidade != null)
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
    return await clienteModel.listar(filtrosNormalizados);
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
      cpfProcessado = String(cpf).trim();
      const cpfValido = /^[\d\s.-]+$/.test(cpfProcessado);
      if (!cpfValido) {
        throw new Error(
          "CPF inválido: cpf deve conter apenas (número, ponto e traço)",
        );
      }
    }

    let telefoneProcessado;

    if (telefone != null) {
      telefoneProcessado = String(telefone).trim();
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
