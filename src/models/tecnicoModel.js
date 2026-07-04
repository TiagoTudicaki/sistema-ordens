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

  async atualizar(id, filtrosNormalizados) {
    const condicoes = [];
    const valores = [];

    if(filtrosNormalizados.nome){
      condicoes.push("nome = ?");
      valores.push(filtrosNormalizados.nome);
    }

    if(filtrosNormalizados.cargo){
      condicoes.push("cargo = ?");
      valores.push(filtrosNormalizados.cargo);
    }

    if(filtrosNormalizados.matricula){
      condicoes.push("matricula = ?");
      valores.push(filtrosNormalizados.matricula);
    }

    if(filtrosNormalizados.telefone){
      condicoes.push("telefone = ?");
      valores.push(filtrosNormalizados.telefone);
    }

    const sql = `UPDATE tecnicos SET ${condicoes.join(", ")} WHERE id = ?`;
    valores.push(id);
    const [tecnicoAtualizado] = await db.query(sql, valores);

    if(tecnicoAtualizado.affectedRows === 0){
      const erro = new Error("Tecnico não encontrado");
      erro.status = 404;
      throw erro;
    }
    return {mensagem:"Tecnico atualizado com sucesso"};
  },

  async excluir(id) {
    await db.query("DELETE FROM tecnicos WHERE id = ?", [id]);

    return { mensagem: "Tecnico excluido" };
  },
};

module.exports = tecnicoModel;
