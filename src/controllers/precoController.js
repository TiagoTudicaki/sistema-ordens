const precoService = require('../services/precoService');

const precoController = {

    async criar(req, res){
        try{

            const dados = req.body; 
            const preco = await precoService.criar(dados);

            res.status(201).json(preco);

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async listar(req, res){

        try{

            const precos = await precoService.listar();
            res.status(200).json(precos);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async buscarPorId(req, res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id)){

                return res.status(400).json({erro:"ID invalido"});
            }

            const preco = await precoService.buscarPorId(id);
            res.status(200).json(preco);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async atualizar(req, res){
        try{

            const {id} = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({erro:"ID invalido"});
            }

            const dados = req.body;

            const preco = await precoService.atualizar(id, dados);
            res.status(200).json(preco);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async excluir(req, res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({erro:"ID invalido"});
            }

            await precoService.excluir(id);
            res.status(200).json({mensagem:"Preco excluido com sucesso"});
            
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    }
}

module.exports = precoController;