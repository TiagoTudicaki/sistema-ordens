const { buscarPorId, atualizar } = require("../controllers/tecnicoController");
const tecnicoModel = require("../models/tecnicoModel");

const tecnicoService = {

    async criar(dados){

        const{nome, especialidade, matricula, telefone} = dados;

        if(!nome) throw new Error("Nome é obrigatório");
        if(!especialidade) throw new Error("Especialidade é obrigatório");
        if(!matricula) throw new Error("Matricula é obrigatório");
        if(!telefone) throw new Error("Telefone é obrigatóro");

        const tecnico = await tecnicoModel.criar(dados);

        return tecnico;

    }, 

    async listar(){
    
            
        const tecnicos = await tecnicoModel.listar();
        return tecnicos;
        
    },

    async buscarPorId(id){

        const tecnico = await tecnicoModel.buscarPorId(id);
        return tecnico;

      
    },

    async atualizar(id, dados){

        const{nome, especialidade, matricula,telefone} = dados;

        if(!nome) throw new Error("Nome é obrigatório");
        if(!especialidade) throw new Error("Especialidade é obrigatório");
        if(!matricula) throw new Error("Matricula é obrigatório");
        if(!telefone) throw new Error("Telefone é obrigatório");

        const tecnico = await tecnicoModel.atualizar(id, dados);
        return tecnico;
    },

    async excluir(id){

        const tecnico = await tecnicoModel.excluir(id);

        return tecnico;
    }

}

module.exports = tecnicoService;