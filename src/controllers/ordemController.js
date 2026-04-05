const ordemService = require("../services/ordemService");

const ordemController = {
  async criar(req, res) {
    try {
      const {
        cliente_id,
        equipamento_id,
        tecnico_id,
        tipo_servico,
        status,
        problema,
        diagnostico,
        solucao,
        detalhes,
        materiais,
        checklist,
      } = req.body;

      if (!cliente_id || !equipamento_id || !tipo_servico) {
        return res.status(400).json({
          erro: "É Obrigatório informar o Id do cliente, ID do equipamento e o tipo serviço",
        });
      }

      const dados = {
        cliente_id,
        equipamento_id,
        tecnico_id,
        tipo_servico,
        status,
        problema,
        diagnostico,
        solucao,
        detalhes,
        materiais,
        checklist,
      };

      const ordem = await ordemService.criar(dados);
      res.status(201).json(ordem);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async listar(req, res) {
    try {
      const ordens = await ordemService.listar();
      res.status(200).json(ordens);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalído" });
      }

      const ordem = await ordemService.buscarPorId(id);
      res.status(200).json(ordem);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalído" });
      }

      if (Object.values(req.body).every((campo) => !campo)) {
        return res
          .status(400)
          .json({ erro: "É necessário atualizar pelo menos um campo" });
      }

      const {
        cliente_id,
        equipamento_id,
        tecnico_id,
        tipo_servico,
        status,
        problema,
        diagnostico,
        solucao,
        detalhes,
        materiais,
        checklist,
      } = req.body;

      const dados = {
        cliente_id,
        equipamento_id,
        tecnico_id,
        tipo_servico,
        status,
        problema,
        diagnostico,
        solucao,
        detalhes,
        materiais,
        checklist,
      };

      const ordem = await ordemService.atualizar(id, dados);
      res.status(200).json(ordem);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID invalído" });
      }

      await ordemService.excluir(id);
      res.status(200).json({ mensagem: "Ordem excluída com sucesso" });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },
};

module.exports = ordemController;
