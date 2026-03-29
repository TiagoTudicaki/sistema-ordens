const ordemService = require("../services/ordemService");

const ordemController = {

    async criar(req, res){
        try{

            const dados = req.body;
            const ordem = await ordemService.criar(dados);
            res.status(201).json(ordem);

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async listar(req, res){

        try{

            const ordens = await ordemService.listar();
            res.status(200).json(ordens);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async buscarPorId(req, res){

        try{

            const {id} = req.params;

        if(!id || isNaN(id)){

            return res.status(400).json({erro:"ID invalído"});
        }

        const ordem = await ordemService.buscarPorId(id);
        res.status(200).json(ordem);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    }, 

    async atualizar(req, res){
        try{

            const {id} = req.params;

            if(!id || isNaN(id)){

                return res.status(400).json({erro:"ID invalído"});
            }

            const dados = req.body;

            const ordem = await ordemService.atualizar(id, dados);
            res.status(200).json(ordem);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async excluir(req, res){

        try{

            const {id} = req.params

            if(!id || isNaN(id)){

                return res.status(400).json({erro:"ID invalído"});

            }

             await ordemService.excluir(id);
            res.status(200).json({mensagem:"Ordem excluída com sucesso"});
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    }
}

module.exports = ordemController;