const equipamentoService = require("../services/equipamentoService");
const tratarErro = require("../utils/tratarErro");
const { validarCamposVazios, validarIdPositivoInt } = require("../utils/validarCampos");

const equipamentoController = {
  async criar(req, res) {
    try {
      const {
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        capacidade_btu,
        tipo_gas,
      } = req.body;

      const clienteIdNumero = Number(cliente_id);

      if (!validarIdPositivoInt(clienteIdNumero)) {
        return res.status(400).json({ erro: "cliente_id é inválido" });
      }

      const camposObrigatorios = {
        local,
        identificador,
      };
      const camposVazios = validarCamposVazios(camposObrigatorios);

      if (camposVazios.length > 0) {
        return res.status(400).json({
          erro: "Campos obrigatórios não preenchidos",
        });
      }

      const dados = {
        cliente_id : clienteIdNumero,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        capacidade_btu,
        tipo_gas,
      };

      const equipamento = await equipamentoService.criar(dados);
      res.status(201).json(equipamento);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async listar(req, res) {
    try {
      const equipamentos = await equipamentoService.listar();
      res.status(200).json(equipamentos);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const equipamento = await equipamentoService.buscarPorId(id);
      res.status(200).json(equipamento);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      if (Object.values(req.body).every((campo) => !campo)) {
        return res
          .status(400)
          .json({ erro: "É necessário pelo menos alterar um campo" });
      }

      const {
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        tipo_gas,
      } = req.body;

      const dados = {
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        tipo_gas,
      };

      const equipamento = await equipamentoService.atualizar(id, dados);
      res.status(200).json(equipamento);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      await equipamentoService.excluir(id);
      res.status(200).json({ message: "Equipamento excluído com sucesso" });
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },
};

module.exports = equipamentoController;
