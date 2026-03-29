const equipamentoService = require('../services/equipamentoService');

const equipamentoController = {

    async criar(req, res){

        try{

            const dados = req.body
            const equipamento = await equipamentoService.criar(dados);
            res.status(201).json(equipamento);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async listar(req, res){

        try{

            const equipamentos = await equipamentoService.listar();
            res.status(200).json(equipamentos);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async buscarPorId(req, res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id) ){
               return res.status(400).json({erro:"ID inválido"})
            }

            const equipamento = await equipamentoService.buscarPorId(id);
            res.status(200).json(equipamento);

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

            const equipamento = await equipamentoService.atualizar(id, dados);
            res.status(200).json(equipamento);

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async excluir(req,res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id)){

                return res.status(400).json({erro:"ID invalído"});
            }

            const equipamento = await equipamentoService.excluir(id);
            res.status(200).json({message:"Equipamento excluído com sucesso"});

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    }
}

module.exports = equipamentoController;