const ordemService = require("../services/ordemService");
const tratarErro = require("../utils/tratarErro");
const {validarCamposObrigatorios, validarId} = require("../utils/validarCampos");
const selecionarCampos = require("../utils/selecaoDeCampos");

const ordemController = {
  async criar(req, res) {
    try {
        const dados = req.body;

        const camposNecessarios = ['cliente_id', 'tipo_servico', 'status'];

        validarCamposObrigatorios(dados,camposNecessarios);

        const camposPermitidos = [
           'cliente_id',
        'equipamento_id',
        'tecnico_id',
        'tipo_servico',
        'status',
        'problema',
        'diagnostico',
        'solucao',
        'detalhes',
        'materiais',
        'checklist',
        'mao_de_obra',
        ];

        const camposWhiteList = selecionarCampos(dados,camposPermitidos);

      
      const ordem = await ordemService.criar(camposWhiteList);
      res.status(201).json(ordem);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {
    try {
      const ordens = await ordemService.listar();
      res.status(200).json(ordens);
    } catch (erro) {
      return tratarErro(res, erro);
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
      return tratarErro(res, erro);
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
      return tratarErro(res, erro);
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
      return tratarErro(res, erro);
    }
  },
};

module.exports = ordemController;
