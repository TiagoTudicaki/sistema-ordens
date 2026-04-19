const clienteModel = require("../models/clienteModel");
const {
  validarCamposVazios,
  campoNomeSomenteTexto,
  campoCidadeSomenteTexto,
  campoEnderecoSomenteTexto,
  telefoneContemCaracterInvalido,
  cpfContemCaracterInvalido,
} = require("../utils/validarCampos");
const { camposVazios } = require("../utils/tratarErro");
const {
  padronizarTexto,
  limparCPF,
  padronizarEndereco,
  limparTelefone,
} = require("../utils/padronizarDados");
const {
  consultaFiltrada,
  filtraConsultaEndereco,
} = require("../utils/filtragemDeConsulta");

const clienteService = {
  async criar(dados) {
    const { nome, cpf, telefone, endereco, cidade } = dados;

    // valida obrigatórios
    const vazios = validarCamposVazios({
      nome,
      cpf,
      telefone,
      endereco,
      cidade,
    });

    if (vazios.length > 0) {
      throw new Error(`Campos vazios: ${vazios.join(", ")}`);
    }

    // valida formato no bruto
    if (!campoNomeSomenteTexto(nome)) {
      throw new Error("Nome deve conter apenas letras e espaços");
    }

    if (!campoCidadeSomenteTexto(cidade)) {
      throw new Error("Cidade deve conter apenas letras e espaços");
    }

    if (!campoEnderecoSomenteTexto(endereco)) {
      throw new Error(
        "Endereço inválido: mínimo 5 caracteres, apenas letras, números, espaços, vírgula, ponto e hífen",
      );
    }

    if (telefoneContemCaracterInvalido(telefone)) {
      throw new Error("Telefone contém caracteres inválidos");
    }

    if (cpfContemCaracterInvalido(cpf)) {
      throw new Error("CPF inválido: cpf deve conter somente números");
    }

    // sanitiza depois da validação
    if (limparCPF(cpf).length !== 11) {
      throw new Error("CPF deve conter 11 dígitos");
    }

    if (
      limparTelefone(telefone).length < 10 ||
      limparTelefone(telefone).length > 11
    ) {
      throw new Error("Telefone deve conter 10 ou 11 dígitos");
    }

    const campos = {
      nome: padronizarTexto(nome),
      cpf: limparCPF(cpf),
      telefone: limparTelefone(telefone),
      endereco: padronizarEndereco(endereco),
      cidade: padronizarTexto(cidade),
    };

    // persistência
    try {
      return await clienteModel.criar(campos);
    } catch (erro) {
      if (erro.code === "ER_DUP_ENTRY") {
        erro.message = "CPF já cadastrado";
        erro.status = 409;
      }
      throw erro;
    }
  },
  async listar(campos) {
    const filtrosValidos = consultaFiltrada(campos);

    const { nome, cpf, telefone, endereco, cidade } = filtrosValidos;

    if (nome && !campoNomeSomenteTexto(nome)) {
      throw new Error("Nome deve conter apenas letras e espaços");
    }

    if (cidade && !campoCidadeSomenteTexto(cidade)) {
      throw new Error("Cidade deve conter apenas letras e espaços");
    }

    if (endereco && !filtraConsultaEndereco(endereco)) {
      throw new Error(
        "Endereço inválido: mínimo 1 caracteres, apenas letras, números, espaços, vírgula, ponto e hífen",
      );
    }

    if (telefone && telefoneContemCaracterInvalido(telefone)) {
      throw new Error("Telefone contém caracteres inválidos");
    }

    if (cpf && cpfContemCaracterInvalido(cpf)) {
      throw new Error("CPF inválido: cpf deve conter somente números");
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
    if (clienteId == null || Number.isNaN(clienteId)) {
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
    if (clienteId == null || Number.isNaN(clienteId)) {
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

    if (nome && !campoNomeSomenteTexto(nome)) {
      throw new Error("Nome deve conter apenas letras e espaços");
    }

    if (cidade && !campoCidadeSomenteTexto(cidade)) {
      throw new Error("Cidade deve conter apenas letras e espaços");
    }

    if (endereco && !filtraConsultaEndereco(endereco)) {
      throw new Error(
        "Endereço inválido: mínimo 1 caracteres, apenas letras, números, espaços, vírgula, ponto e hífen",
      );
    }

    if (telefone && telefoneContemCaracterInvalido(telefone)) {
      throw new Error("Telefone contém caracteres inválidos");
    }

    if (cpf && cpfContemCaracterInvalido(cpf)) {
      throw new Error("CPF inválido: cpf deve conter somente números");
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
    if (clienteId == null || Number.isNaN(clienteId)) {
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
