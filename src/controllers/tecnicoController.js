const tecnicoService = require('../services/tecnicoService');


const tecnicoController = {

    async criar(req, res){

        try{

            const dados = req.body;

            const tecnico = await tecnicoService.criar(dados);
            res.status(201).json(tecnico);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async listar(req, res){

        try{

            const tecnicos = await tecnicoService.listar();
            res.status(200).json(tecnicos);
        }catch(erro){
            
            res.status(500).json({erro:erro.message});
        }
    }, 

    async buscarPorId(req,res){

        try{

            const {id} = req.params;
            
            if(!id || isNaN(id)){
                return res.status(400).json({erro:"ID invalido"});
            }

            const tecnico = await tecnicoService.buscarPorId(id);

            res.status(200).json(tecnico);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async atualizar(req,res){

        try{

            const {id} = req.params;

            if(!id || isNaN(id)){

                return res.status(400).json({erro:"ID invalido"});
            }

            const dados = req.body;

            const tecnico = await tecnicoService.atualizar(id, dados);
            res.status(200).json(tecnico);
        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    },

    async excluir(req, res){
        try{
    
        const {id} = req.params

        if(!id || isNaN(id)){

            return res.status(400).json({erro:"ID invalido"});

        }

        await tecnicoService.excluir(id);

        res.status(200).json({message:"Tecnico excluido com sucesso"});

        }catch(erro){

            res.status(500).json({erro:erro.message});
        }
    }

}

module.exports = tecnicoController;