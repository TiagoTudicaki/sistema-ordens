const clienteService = require("../services/clienteService");
const { tratarErro } = require("../utils/tratarErro");
const { validarIdPositivoInt } = require("../utils/validarCampos");

const clienteController = {
  async criar(req, res) {
    try {
      const dados = req.body;

      if (!dados || Object.keys(dados).length === 0) {
        return res.status(400).json({ erro: "Requisição inválida" });
      }

      const cliente = {
        nome: dados.nome,
        cpf: dados.cpf,
        telefone: dados.telefone,
        endereco: dados.endereco,
        cidade: dados.cidade,
      };

      const clienteNovo = await clienteService.criar(cliente);
      return res.status(201).json(clienteNovo);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {
    try {
      const campos = {
        nome: req.query.nome,
        cpf: req.query.cpf,
        telefone: req.query.telefone,
        endereco: req.query.endereco,
        cidade: req.query.cidade,
      };

      const clientes = await clienteService.listar(campos);
      return res.status(200).json(clientes);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const clienteId = Number(id);

      if (!validarIdPositivoInt(clienteId)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      const cliente = await clienteService.buscarPorId(clienteId);
      return res.status(200).json(cliente);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const clienteId = Number(id);

      if (!validarIdPositivoInt(clienteId)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      if (
        Object.values(req.body).every(
          (campo) => campo == null || String(campo).trim() === "",
        )
      ) {
        return res
          .status(400)
          .json({ erro: "É obrigatório atualizar pelo menos um campo" });
      }

      const { nome, cpf, telefone, endereco, cidade } = req.body;

      const dados = { nome, cpf, telefone, endereco, cidade };

      const cliente = await clienteService.atualizar(clienteId, dados);

      return res.status(200).json(cliente);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      const clienteId = Number(id);

      if (!validarIdPositivoInt(clienteId)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      await clienteService.excluir(clienteId);

      return res.status(200).json({ message: "Cliente excluido com sucesso" });
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },
};

module.exports = clienteController;
