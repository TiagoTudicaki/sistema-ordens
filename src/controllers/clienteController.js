const clienteService = require("../services/clienteService");

const clienteController = {
  
  async criar(req, res) {
    try {
      const { nome, cpf, telefone, endereco, cidade } = req.body;

      if (
        !nome?.trim() ||
        !cpf?.trim() ||
        !telefone?.trim() ||
        !endereco?.trim() ||
        !cidade?.trim()
      ) {
        return res
          .status(400)
          .json({ erro: "Todos os campos são obrigatórios" });
      }

      const dados = { nome, cpf, telefone, endereco, cidade };

      const cliente = await clienteService.criar(dados);
      res.status(201).json(cliente);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async listar(req, res) {
    try {
      const clientes = await clienteService.listar();
      res.json(clientes);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      const cliente = await clienteService.buscarPorId(id);
      res.json(cliente);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      if (Object.values(req.body).every((campo) => !campo)) {
        return res
          .status(400)
          .json({ erro: "É obrigatório atualizar pelo menos um campo" });
      }

      const { nome, cpf, telefone, endereco, cidade } = req.body;

      const dados = { nome, cpf, telefone, endereco, cidade };

      const cliente = await clienteService.atualizar(id, dados);

      res.status(200).json(cliente);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID Inválido" });
      }

      await clienteService.excluir(id);

      res.status(200).json({ message: "Cliente excluido com sucesso" });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },
};

module.exports = clienteController;
