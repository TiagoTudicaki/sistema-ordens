const db = require("../config/database");

const clienteModel = {
  async criar({ nome, cpf, telefone, endereco, cidade }) {
    const [resultado] = await db.query(
      "INSERT INTO clientes(nome, cpf, telefone, endereco,cidade)VALUES(?, ?, ?, ?, ?)",
      [nome, cpf, telefone, endereco, cidade],
    );

    return {
      id: resultado.insertId,
      nome,
      cpf,
      telefone,
      endereco,
      cidade,
    };
  },

  async listar(filtrosNormalizados) {
    let sql = "SELECT id, nome, cpf, telefone, endereco, cidade FROM  clientes";
    const condicoes = [];
    const valores = [];

    if (filtrosNormalizados.nome) {
      condicoes.push("nome LIKE ?");
      valores.push(`%${filtrosNormalizados.nome}%`);
    }

    if (filtrosNormalizados.cpf) {
      condicoes.push("cpf = ?");
      valores.push(`%${filtrosNormalizados.cpf}%`);
    }

    if (filtrosNormalizados.telefone) {
      condicoes.push("telefone = ?");
      valores.push(`%${filtrosNormalizados.telefone}%`);
    }

    if (filtrosNormalizados.endereco) {
      condicoes.push("endereco LIKE ?");
      valores.push(`%${filtrosNormalizados.endereco}%`);
    }

    if (filtrosNormalizados.cidade) {
      condicoes.push("cidade LIKE ?");
      valores.push(`%${filtrosNormalizados.cidade}%`);
    }

    if (condicoes.length > 0) {
      sql += " WHERE " + condicoes.join(" AND ");
    }

    const [clientes] = await db.query(sql, valores);
    return clientes;
  },

  async buscarPorId(clienteId) {
    const [rows] = await db.query("SELECT * FROM clientes WHERE id = ?", [
      clienteId,
    ]);

    return rows[0];
  },

  async atualizar(clienteId, { nome, cpf, telefone, endereco, cidade }) {
    const [resultado] = await db.query(
      "UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, endereco = ?, cidade = ? WHERE  id = ?",
      [nome, cpf, telefone, endereco, cidade, clienteId],
    );

    return resultado;
  },

  async excluir(clienteId) {
    const [resultado] = await db.query("DELETE FROM clientes WHERE id = ?", [
      clienteId,
    ]);

    return resultado;
  },
};

module.exports = clienteModel;
