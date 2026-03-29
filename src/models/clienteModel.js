const conexao = require('../config/database');
const db = require('../config/database');


const clienteModel = {

    async criar(dados){

        const{nome, cpf, telefone, endereco, cidade} = dados;

        const[resultado] = await db.query(
        'INSERT INTO clientes(nome, cpf, telefone, endereco,cidade)VALUES(?, ?, ?, ?, ?)',
        [nome, cpf, telefone, endereco, cidade]
        );
        
        
        return {
            id: resultado.insertId,
            nome,
            cpf,
            telefone,
            endereco,
            cidade
        };
    },

    async listar(){

        const[clientes] = await db.query(
            'SELECT * FROM clientes'
        );
        return clientes;
    },

    async buscarPorId(id){

        const [cliente] = await db.query(
            'SELECT * FROM clientes WHERE id = ?',
            [id]
        );

        return cliente[0];
    },

    async atualizar(id,dados){

        
        const {nome, cpf, telefone, endereco,cidade} = dados

        const[atualizado] = await db.query(
            'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, endereco = ?, cidade = ? WHERE  id = ?',
                [nome, cpf, telefone,endereco,cidade,id]
        );

        return{
            id,
            nome,
            cpf,
            telefone,
            endereco,
            cidade
        };
    },

    async excluir(id){

        await db.query(
            'DELETE FROM clientes WHERE id = ?',
            [id]

        );

        return{mensagem:'Cliente excluido'}

    }
}

module.exports = clienteModel;