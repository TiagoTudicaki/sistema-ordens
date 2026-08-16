const equipamentoService = require("../services/equipamentoService");
const tratarErro = require("../utils/tratarErro");
const {validarId } = require("../utils/validarCampos");

const equipamentoController = {
  async criar(req, res) {
    
    
    try {
      const dados = req.body;

      console.log(dados);
      
      if(!dados || Object.keys(dados).length === 0){
       return res.status(400).json({erro:"Requisição inválida"});
      }

      const clienteIdNumero = Number(dados.cliente_id);

      if (!validarId(clienteIdNumero)) {
        return res.status(400).json({ erro: "cliente_id é inválido" });
      }

      const equipamento = {
        cliente_id: clienteIdNumero,
        tipo: dados.tipo,
        local: dados.local,
        identificador: dados.identificador,
        marca: dados.marca,
        modelo: dados.modelo,
        serie: dados.serie,
        capacidade_btu: dados.capacidade_btu,
        tipo_gas: dados.tipo_gas,
      } ;

     
      
      const novoEquipamento = await equipamentoService.criar(equipamento);
      
      return res.status(201).json(novoEquipamento);
      
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({erro:"essa mensagem é a exibida"});
    }
  },

  async listar(req, res) {
    try {
     const dados = req.query;
     
     const campos = {
      cliente_id: dados.cliente_id,
      tipo: dados.tipo,
      local: dados.local,
      identificador: dados.identificador,
      marca: dados.marca,
      modelo: dados.modelo,
      serie: dados.serie,
      capacidade_btu: dados.capacidade_btu,
      tipo_gas: dados.tipo_gas,
     }

     const equipamentos = await equipamentoService.listar(campos);
     return res.status(200).json(equipamentos);
    } catch (erro) {
      return tratarErro(res, erro);
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      validarId(id);

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
