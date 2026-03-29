const db = require("../config/database");
const { buscarPorId } = require("../services/tecnicoService");

const tecnicoModel = {

    async criar(dados){

        const{nome, especialidade, matricula, telefone} = dados;

        const [tecnicoNovo] = await db.query(
            'INSERT INTO tecnicos(nome, especialidade, matricula, telefone)VALUES(?, ?, ?, ?)',
            [  nome,especialidade, matricula, telefone]
        );

        return {
            id:tecnicoNovo.insertId,
            nome,
            especialidade,
            matricula,
            telefone
        };
    },

    async listar(){

        const [tecnicos] = await db.query(
            'SELECT * FROM tecnicos'
        );

        return tecnicos;

    },

    async buscarPorId(id){

        const [tecnico] = await db.query(
            'SELECT * FROM tecnicos WHERE id = ?',
            [id]
        );

        return tecnico[0];
    },

    async atualizar(id, dados){

        const {nome, especialidade, matricula, telefone} = dados;

        const[tecnicoAtualizado] = await db.query(
            'UPDATE tecnicos SET nome = ?, especialidade = ?, matricula = ?, telefone = ? WHERE id = ?',
            [nome, especialidade, matricula, telefone,id]
        );

        return{
            id,
            nome,
            especialidade,
            matricula,
            telefone
        };

    },

    async excluir(id){

    await db.query(
        'DELETE FROM tecnicos WHERE id = ?',
        [id]
    );


    return{mensagem:"Tecnico excluido"};
    }
}

module.exports = tecnicoModel;