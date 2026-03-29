const { buscarPorId, excluir } = require("../controllers/ordemController");
const ordemModel = require("../models/ordemModel");

const ordemService = {

    async criar(dados){

        const {cliente_id, equipamento_id, tipo_servico} = dados;

        if(!cliente_id) throw new  Error("O id do cliente é necessário");
        if(!equipamento_id) throw new Error("O id do equipamento é necessário");
        if(!tipo_servico) throw new Error("É necessário informa tipo de serviço");

        const ordem = await ordemModel.criar(dados);

        return ordem;
    },

    async listar(){

        const ordens = await ordemModel.listar();
        return ordens;
    },

    async buscarPorId(id){

        const ordem = await ordemModel.buscarPorId(id);
        return ordem;
    },

    async atualizar(id, dados){

        const{cliente_id, equipamento_id, tipo_servico} = dados;

        if(!cliente_id) throw new Error("O id do cliente é obrigatório");
        if(!equipamento_id) throw new Error("O id do equipamento é obrigatório");
        if(!tipo_servico) throw new Error("O tipo de serviço é obrigatório");

        const ordem = await ordemModel.atualizar(id, dados);
        return ordem;
    },

    async excluir(id){

        const ordem = await ordemModel.excluir(id);
        return ordem;
    }
}

module.exports = ordemService;