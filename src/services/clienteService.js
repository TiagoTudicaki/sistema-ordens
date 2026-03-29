
const clienteModel = require('../models/clienteModel');
const clienteService = {
    async criar(dados){
        

            const{nome, cpf, telefone, endereco, cidade} = dados;

            if(!nome) throw new Error("Nome é obrigatório");
            if(!cpf) throw new Error("CPF é obrigatório");
            if(!telefone) throw new Error("Telefone é obrigatório");
            if(!endereco) throw new Error("Endereço é obrigatório");
            if(!cidade) throw new Error("Cidade é obrigatório");

            const cliente = await clienteModel.criar(dados);
            return cliente;
       
    },

    async listar(){
        
        const clientes = await clienteModel.listar();

        return clientes;
     
    },

    async buscarPorId(id){

        const cliente = await clienteModel.buscarPorId(id);

        if(!cliente) throw new Error('Cliente não encontrado');
        

        return cliente;

    },

    async atualizar(id, dados){

        const {nome, cpf, telefone, endereco, cidade} = dados;

        if(!nome) throw new Error("Nome é obrigatório");
        if(!cpf) throw new Error("CPF é obrigatório");
        if(!telefone) throw new Error("Telefone é obrigatório");
        if(!endereco) throw new Error("Endereço é obrigatório");
        if(!cidade)  throw new Error("Cidade é obrigatório")

          const cliente = await clienteModel.atualizar(id,dados);
          return cliente;  
    },

    async excluir(id){

        const cliente = await clienteModel.excluir(id);
        return cliente;
        
    }


}

module.exports = clienteService;