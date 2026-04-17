const tecnicoService = require("../services/tecnicoService");
const tratarErro = require("../utils/tratarErro");
const { validarCamposVazios } = require("../utils/validarCampos");

const tecnicoController = {
  async criar(req, res) {
    try {
      const { nome, especialidade, matricula, telefone } = req.body;

      const camposObrigatorios = { nome, especialidade, matricula, telefone };

      const camposVazios = validarCamposVazios(camposObrigatorios);

      if (camposVazios) {
        return res
          .status(400)
          .json({
            erro: "Os campos Nome, Especialidade, Matrícula, Telefone são obrigatórios",
          });
      }

      const dados = { nome, especialidade, matricula, telefone };

      const tecnico = await tecnicoService.criar(dados);
      res.status(201).json(tecnico);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {
    try {
      const tecnicos = await tecnicoService.listar();
      res.status(200).json(tecnicos);
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

      const tecnico = await tecnicoService.buscarPorId(id);

      res.status(200).json(tecnico);
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

      const { nome, especialidade, matricula, telefone } = req.body;

      const dados = { nome, especialidade, matricula, telefone };

      const tecnico = await tecnicoService.atualizar(id, dados);
      res.status(200).json(tecnico);
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

      await tecnicoService.excluir(id);

      res.status(200).json({ message: "Tecnico excluido com sucesso" });
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },
};

module.exports = tecnicoController;
