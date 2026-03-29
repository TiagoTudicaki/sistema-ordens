const { buscarPorId, atualizar } = require("../controllers/precoController");
const precoModel = require("../models/precoModel");

const precoService = {

    async criar(dados){

        const {codigo, descricao, preco_uni, unidade} = dados;

        if(!codigo) throw new Error("Codigo é obrigatório");
        if(!descricao) throw new Error("Descrição é obrigatório");
        if(!preco_uni) throw new Error("Preço é obrigatório");
        if(!unidade) throw new Error("Unidade é obrigatório");

        const preco = await precoModel.criar(dados);
        return preco;
    },

    async listar(){

        const precos = await precoModel.listar();
        return precos;
    },

    async buscarPorId(id){

        

            const preco = await precoModel.buscarPorId(id);
            return preco;

    },

    async atualizar(id, dados){

        const{codigo, descricao, preco_uni, unidade } = dados;

        if(!codigo) throw new Error("Codigo é obrigatório");
        if(!descricao) throw new Error("Descrição é obrigatório");
        if(!preco_uni) throw new Error("Preço é obrigatório");
        if(!unidade) throw new Error("Unidade é obrigatório");

        const preco = await precoModel.atualizar(id, dados);
        return preco;


    },

    async excluir(id){

        const preco = await precoModel.excluir(id);

        return preco;
    }

    

} 

module.exports = precoService;