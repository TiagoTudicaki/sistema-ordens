const clienteService = require('../services/clienteService');

const clienteController = {

    async criar(req, res){
        try{

            const dados = req.body;
            const cliente = await clienteService.criar(dados)
            res.status(201).json(cliente);

            
        }catch(erro){
            res.status(500).json({erro:erro.message})
        }
    },

    async listar(req, res){
        try{

            const clientes = await clienteService.listar();
            res.json(clientes);
        }catch(erro){
            res.status(500).json({erro: erro.message});
        }
    },

    async buscarPorId(req,res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id))
            return res.status(400).json({erro: 'ID Inválido'});   

            const cliente = await clienteService.buscarPorId(id);
            res.json(cliente);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async atualizar(req, res){

        try{
            console.log("rodando controller")
            const{id} = req.params;
            const dados = req.body;

             if(!id || isNaN(id))
            return res.status(400).json({erro: 'ID Inválido'});

             if(!dados || Object.keys(dados).length === 0){
                return res.status(400).json({erro:'Dados para atualização obrigatório'});
             }
        
             const cliente = await clienteService.atualizar(id,dados);

             res.json(cliente);

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },


    async excluir(req, res){

       try{

         const{id} = req.params;

         if(!id || isNaN(id))
            return res.status(400).json({erro: 'ID Inválido'});

          await clienteService.excluir(id);

         res.status(200).json({message:'Cliente excluido com sucesso'});
        
       }catch(erro){

        res.status(500).json({erro:erro.message});
       }

    }
}

module.exports = clienteController;