const db = require("../config/database");
const { validarCamposVazios } = require("../utils/validarCampos");

const tecnicoModel = {
  async criar({ nome, cargo, matricula, telefone }) {
    const [tecnicoNovo] = await db.query(
      "INSERT INTO tecnicos(nome, cargo, matricula, telefone)VALUES(?, ?, ?, ?)",
      [nome, cargo, matricula, telefone],
    );

    return {
      id: tecnicoNovo.insertId,
      nome,
      cargo,
      matricula,
      telefone,
    };
  },

  async listar(filtrosNormalizados) {
    let sql = ("SELECT id, nome, cargo, matricula, telefone FROM tecnicos");
   const condicoes = [];
    const valores = [];

    if(filtrosNormalizados.nome){
      condicoes.push("nome LIKE ?");
      valores.push(`%${filtrosNormalizados.nome}%`);
    }

    if(filtrosNormalizados.cargo){
      condicoes.push("cargo LIKE ?");
      valores.push(`%${filtrosNormalizados.cargo}%`);
    }

    if(filtrosNormalizados.matricula){
      condicoes.push("matricula = ?");
      valores.push(`${filtrosNormalizados.matricula}`);
    }

    if(filtrosNormalizados.telefone){
      condicoes.push("telefone LIKE ?");
      valores.push(`%${filtrosNormalizados.telefone}%`);
    }

    if(condicoes.length > 0){
      sql += " WHERE " + condicoes.join(" AND ");
    }

    const[tecnicos] = await db.query(sql,valores);
    
    return tecnicos;
  },

  async buscarPorId(id) {
    const [tecnico] = await db.query("SELECT * FROM tecnicos WHERE id = ?", [
      id,
    ]);

    return tecnico[0];
  },

  async atualizar(id, { nome, especialidade, matricula, telefone }) {
    const [tecnicoAtualizado] = await db.query(
      "UPDATE tecnicos SET nome = ?, especialidade = ?, matricula = ?, telefone = ? WHERE id = ?",
      [nome, especialidade, matricula, telefone, id],
    );

    return {
      id,
      nome,
      especialidade,
      matricula,
      telefone,
    };
  },

  async excluir(id) {
    await db.query("DELETE FROM tecnicos WHERE id = ?", [id]);

    return { mensagem: "Tecnico excluido" };
  },
};

module.exports = tecnicoModel;
