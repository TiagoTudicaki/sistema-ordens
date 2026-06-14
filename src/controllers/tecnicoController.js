const { json } = require("express");
const tecnicoService = require("../services/tecnicoService");
const tratarErro = require("../utils/tratarErro");
const { validarCamposVazios } = require("../utils/validarCampos");

const tecnicoController = {
  async criar(req, res) {
    try {
      const dados = req.body;

      if(!dados || Object.keys(dados).length === 0){
        return res.status(400).json({erro:"Requisição vazia"});
      }

      const tecnico = {   
        nome: dados.nome,
        cargo: dados.cargo,
        matricula: dados.matricula,
        telefone: dados.telefone

      }

      const tecnicoNovo = await tecnicoService.criar(tecnico);
      res.status(201).json(tecnicoNovo);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {

    try {
      const dados = req.query;

      const campos = {
        nome: dados.nome,
        cargo: dados.cargo,
        matricula: dados.matricula,
        telefone: dados.telefone
      }
      const tecnicos =  await tecnicoService.listar(campos);
      return res.status(200).json(tecnicos);
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
