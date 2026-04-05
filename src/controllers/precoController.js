const precoService = require("../services/precoService");

const precoController = {
  async criar(req, res) {
    try {
      const { codigo, descricao, preco_uni, unidade } = req.body;

      if (
        !codigo?.trim() ||
        !descricao?.trim() ||
        !preco_uni ||
        !unidade?.trim()
      ) {
        return res.status(400).json({
          erro: "Os campos(codigo, descrição, preco_uni e unidade) são necessários ",
        });
      }

      const dados = { codigo, descricao, preco_uni, unidade };

      const preco = await precoService.criar(dados);

      res.status(201).json(preco);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async listar(req, res) {
    try {
      const precos = await precoService.listar();
      res.status(200).json(precos);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
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
      res.status(500).json({ erro: erro.message });
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
      res.status(500).json({ erro: erro.message });
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
      res.status(500).json({ erro: erro.message });
    }
  },
};

module.exports = precoController;
