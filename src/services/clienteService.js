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

const clienteService = {
  async criar(dados) {
    const { nome, cpf, telefone, endereco, cidade } = dados;

    // 1. valida obrigatórios PRIMEIRO
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

    // 2. valida formato no bruto
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

    // 3. sanitiza depois da validação
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

    // 4. persistência
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
  async listar() {
    return await clienteModel.listar();
  },

  async buscarPorId(id) {
    const resultado = await clienteModel.buscarPorId(id);

    if (!resultado) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return resultado;
  },

  async atualizar(id, dados) {
    const resultado = await clienteModel.atualizar(id, dados);

    if (resultado.affectedRows === 0) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }
    return { id, ...dados };
  },

  async excluir(id) {
    const resultado = await clienteModel.excluir(id);

    if (resultado.affectedRows === 0) {
      const erro = new Error("Cliente não encontrado");
      erro.status = 404;
      throw erro;
    }

    return { mensagem: "Cliente excluído com sucesso" };
  },
};

module.exports = clienteService;
