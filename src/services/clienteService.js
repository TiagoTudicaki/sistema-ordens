const clienteModel = require("../models/clienteModel");
const {
  validarCamposVazios,
  validarTextoSimples,
  validarEndereco,
  cpfContemCaracterInvalido,
  validarIdPositivoInt,
} = require("../utils/validarCampos");
const {
  padronizarTexto,
  sanitizarTextoObrigatorios,
  limparCPF,
  limparTelefone,
  padronizarEndereco,
  padronizarCidade,
} = require("../utils/padronizarDados");
const {
  consultaFiltrada,
  filtraConsultaEndereco,
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

    const nomeLimpo = sanitizarTextoObrigatorios(nome);

    if (nomeLimpo === "") {
      throw new Error("Nome não pode ser vazio");
    }

    const nomePadronizado = padronizarTexto(nomeLimpo);

    const nomeValido = validarTextoSimples(nomePadronizado);

    if (!nomeValido) {
      throw new Error("Nome deve possuir apenas letras e espaços");
    }

    // --- CPF ---
    if (typeof cpf !== "string" && typeof cpf !== "number") {
      throw new Error("CPF inválido");
    }

    // Remove tudo que não for número
    const cpfLimpo = limparCPF(cpf);

    if (cpfLimpo.length !== 11) {
      throw new Error("CPF inválido");
    }

    // --- TELEFONE ---
    if (typeof telefone !== "string" && typeof telefone !== "number") {
      throw new Error("Telefone inválido");
    }

    // Remove caracteres como (), espaço e hífen
    const telefoneLimpo = limparTelefone(telefone);

    if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {
      throw new Error("Telefone deve conter 10 ou 11 dígitos");
    }

    // --- ENDEREÇO ---
    if (typeof endereco !== "string") {
      throw new Error("Endereço inválido");
    }

    const enderecoLimpo = sanitizarTextoObrigatorios(endereco);

    if (enderecoLimpo === "") {
      throw new Error("Endereço não pode ser vazio");
    }

    const enderecoPadronizado = padronizarEndereco(enderecoLimpo);

    const enderecoValido = validarEndereco(enderecoPadronizado);

    if (!enderecoValido) {
      throw new Error("Endereço inválido");
    }

    // --- CIDADE ---
    if (typeof cidade !== "string") {
      throw new Error("Cidade inválida");
    }

    const cidadeLimpo = sanitizarTextoObrigatorios(cidade);

    if (cidadeLimpo === "") {
      throw new Error("Cidade não pode ser vazia");
    }

    const cidadePadronizada = padronizarCidade(cidadeLimpo);

    const cidadeValida = validarTextoSimples(cidadePadronizada);

    if (!cidadeValida) {
      throw new Error("Cidade deve possuir apenas letras e espaços");
    }

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

    if (nome && !validarTextoSimples(nome)) {
      throw new Error("Nome deve conter apenas letras e espaços");
    }

    if (cpf && cpfContemCaracterInvalido(cpf)) {
      throw new Error("CPF inválido: cpf deve conter somente números");
    }

    if (telefone && telefoneContemCaracterInvalido(telefone)) {
      throw new Error("Telefone contém caracteres inválidos");
    }

    if (endereco && !filtraConsultaEndereco(endereco)) {
      throw new Error(
        "Endereço inválido: mínimo 1 caracteres, apenas letras, números, espaços, vírgula, ponto e hífen",
      );
    }

    if (cidade && !validarTextoSimples(cidade)) {
      throw new Error("Cidade deve conter apenas letras e espaços");
    }

    const filtrosNormalizados = {};

    if (nome) filtrosNormalizados.nome = padronizarTexto(nome);
    if (cpf) filtrosNormalizados.cpf = limparCPF(cpf);
    if (telefone) filtrosNormalizados.telefone = limparTelefone(telefone);
    if (endereco) filtrosNormalizados.endereco = padronizarEndereco(endereco);
    if (cidade) filtrosNormalizados.cidade = padronizarTexto(cidade);

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
    if (!validarIdPositivoInt(clienteId)) {
      throw new Error("ID inválido");
    }

    if (
      Object.values(dados).every(
        (campo) => campo == null || String(campo).trim() === "",
      )
    ) {
      throw new Error(
        "É obrigatório informar ao menos um campo para atualização",
      );
    }

    const camposVazios = validarCamposVazios(dados);

    if (camposVazios.length > 0) {
      throw new Error("Campos não podem ser vazios ou com apenas espaços");
    }

    const { nome, cpf, telefone, endereco, cidade } = dados;

    if (nome && !validarTextoSimples(nome)) {
      throw new Error("Nome deve conter apenas letras e espaços");
    }

    if (cpf && cpfContemCaracterInvalido(cpf)) {
      throw new Error("CPF inválido: cpf deve conter somente números");
    }

    if (telefone && telefoneContemCaracterInvalido(telefone)) {
      throw new Error("Telefone contém caracteres inválidos");
    }

    if (endereco && !filtraConsultaEndereco(endereco)) {
      throw new Error(
        "Endereço inválido: mínimo 1 caracteres, apenas letras, números, espaços, vírgula, ponto e hífen",
      );
    }

    if (cidade && !validarTextoSimples(cidade)) {
      throw new Error("Cidade deve conter apenas letras e espaços");
    }

    const filtrosNormalizados = {};

    if (nome) filtrosNormalizados.nome = padronizarTexto(nome);
    if (cpf) filtrosNormalizados.cpf = limparCPF(cpf);
    if (telefone) filtrosNormalizados.telefone = limparTelefone(telefone);
    if (endereco) filtrosNormalizados.endereco = padronizarEndereco(endereco);
    if (cidade) filtrosNormalizados.cidade = padronizarTexto(cidade);

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
