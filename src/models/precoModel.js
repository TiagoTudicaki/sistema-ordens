const db = require("../config/database");
const { buscarPorId, atualizar } = require("../services/precoService");

const precoModel = {

    async criar(dados){

        const {codigo, descricao, preco_uni, unidade} = dados;

        const[precoNovo] = await db.query(
            'INSERT INTO precos(codigo, descricao, preco_uni, unidade)VALUES(?, ?, ?, ?)',
            [codigo, descricao, preco_uni, unidade]
        );

        return{
            id:precoNovo.insertId,
            codigo,
            descricao,
            preco_uni,
            unidade
        };
    },

    async listar(){

       const [preco] = await db.query(
            'SELECT * FROM precos'
        );


        return precos;
    },

    async buscarPorId(id){

        const [preco] = await db.query(
            'SELECT * FROM precos WHERE id = ?',
            [id]
        );

        return preco[0];
    },

    async atualizar(id,dados){

        const{codigo, descricao, preco_uni, unidade} = dados;

        const [precoAtualizado] = await db.query(
            'UPDATE precos SET codigo = ?, descricao = ?, preco_uni = ?, unidade = ? WHERE id = ?',
            [codigo, descricao, preco_uni, unidade, id]
        );

        return{
            id,
            codigo,
            descricao,
            preco_uni,
            unidade

        };
    },

    async excluir(id){

        await db.query(
            'DELETE  FROM precos WHERE id = ?',
            [id]
        );

        return{Mesagem:"Preços excluido com sucesso"};
    }
}

module.exports = precoModel;