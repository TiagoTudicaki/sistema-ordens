const db = require('../config/database');
const { buscarPorId, atualizar } = require('../services/equipamentoService');

const equipamentoModel = {

    async criar(dados){

        const {cliente_id, tipo, marca, modelo, serie, tipo_gas} = dados;

        const [equipamentoNovo] = await db.query(`
            INSERT INTO  equipamentos(cliente_id, tipo, marca, modelo, serie, tipo_gas)VALUES(?, ?, ?, ?, ?, ?)`,
        [cliente_id, tipo, marca, modelo, serie, tipo_gas]);

        return{
            id:equipamentoNovo.insertId,
            cliente_id,
            tipo,
            marca,
            modelo,
            serie,
            tipo_gas
        };
    }, 

    async listar(){

        const [equipamentos] = await db.query(
            'SELECT * FROM  equipamentos'
            
        );

        return equipamentos;
    },

    async buscarPorId(id){


        const [equipamento] = await db.query(
            'SELECT * FROM equipamentos WHERE id = ?',
            [id]
        );

        return equipamento[0];
    },

    async atualizar(id, dados){

        const { cliente_id, tipo, marca, modelo, serie, tipo_gas} = dados;

        const [equipamentoAtualizado] = await db.query(
            'UPDATE equipamentos SET cliente_id = ?, tipo = ?, marca = ?, modelo = ?, serie = ?, tipo_gas = ?   WHERE id = ?',
            [id, cliente_id, tipo, marca, modelo, serie, tipo_gas]
        );

        return{
            id,
            cliente_id,
            tipo,
            marca,
            modelo,
            serie,
            tipo_gas,
        
        };
    }, 

    async excluir(id){

        await db.query(
            'DELETE FROM equipamentos WHERE id = ?',
            [id]
        );

        return{ Mensagem: "Equipamento excluido"};
    }
}

module.exports = equipamentoModel;