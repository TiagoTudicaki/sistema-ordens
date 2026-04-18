const precoService = require("../services/precoService");
const tratarErro = require("../utils/tratarErro");
const { validarCamposVazios } = require("../utils/validarCampos");

const precoController = {
  async criar(req, res) {
    try {
      const { codigo, descricao, preco_uni, unidade } = req.body;

      const camposObrigatorios = { codigo, descricao, preco_uni, unidade };

      const camposVazios = validarCamposVazios(camposObrigatorios);

      if (camposVazios) {
        return res.status(400).json({
          erro: "Os campos codigo, descricao, preco_uni, unidade são obrigatórios",
        });
      }

      const dados = { codigo, descricao, preco_uni, unidade };

      const preco = await precoService.criar(dados);

      res.status(201).json(preco);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {
    try {
      const precos = await precoService.listar();
      res.status(200).json(precos);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalido" });
      }

      const preco = await precoService.buscarPorId(id);
      res.status(200).json(preco);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalido" });
      }

      if (Object.values(req.body).every((campo) => !campo)) {
        return res
          .status(400)
          .json({ erro: "É necessário atualizar pelo menos um campo" });
      }

      const { codigo, descricao, preco_uni, unidade } = req.body;

      const dados = { codigo, descricao, preco_uni, unidade };

      const preco = await precoService.atualizar(id, dados);
      res.status(200).json(preco);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalido" });
      }

      await precoService.excluir(id);
      res.status(200).json({ mensagem: "Preco excluido com sucesso" });
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },
};

module.exports = precoController;
