const { buscarPorId } = require('../controllers/equipamentoController');
const equipamentoModel = require('../models/equipamentoModel');

const equipamentoService = {

    async criar(dados){

        const {cliente_id, tipo, tipo_gas} = dados;

        if(!cliente_id) throw new Error("ID do cliente é obrigatório");
        if(!tipo) throw new Error("Tipo é obrigatorio");
        if(!tipo_gas) throw new Error("O gas é obrigatório");

        const equipamento = await equipamentoModel.criar(dados);
        return  equipamento;


    },

    async listar(){

        const equipamentos = await equipamentoModel.listar();
        return equipamentos;
    },

    async buscarPorId(id){

        const equipamento = await equipamentoModel.buscarPorId(id);
        return equipamento;
    },

    async atualizar(id, dados){

        const{cliente_id, tipo, tipo_gas} = dados;

        if(!cliente_id) throw new Error("ID do cliente é obrigatório");
        if(!tipo) throw new Error("tipo é obrigatório");
        if(!tipo_gas) throw new Error("O gas é obrigatório");

        const equipamento = await equipamentoModel.atualizar(id,dados);
        return equipamento;
    },

    async excluir(id){

        const equipamento = await equipamentoModel.excluir(id);
        return equipamento;
    }
}

module.exports = equipamentoService;