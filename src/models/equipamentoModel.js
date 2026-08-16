const db = require("../config/database");

const equipamentoModel = {
  async criar({
    cliente_id,
    tipo,
    local,
    identificador,
    marca,
    modelo,
    serie,
    capacidade_btu,
    tipo_gas,
  }) {
    const [equipamentoNovo] = await db.query(
      `
            INSERT INTO  equipamentos(cliente_id, tipo, local, identificador, marca, modelo, serie, capacidade_btu, tipo_gas) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        capacidade_btu,
        tipo_gas,
      ],
    );

    return {
      id: equipamentoNovo.insertId,
      cliente_id,
      tipo,
      local,
      identificador,
      marca,
      modelo,
      serie,
      capacidade_btu,
      tipo_gas,
    };
  },

  async listar(camposComDados) {
    let sql =
      "SELECT cliente_id, tipo, local, identificador, marca, modelo, serie, capacidade_btu, tipo_gas FROM equipamentos";

    const camposParciais = [
      "marca",
      "modelo",
      "local",
      "identificador",
      "serie",
      "capacidade_btu",
      "tipo_gas",
    ];
    const camposExatos = ["cliente_id", "tipo"];

    const condicoes = [];
    const valores = [];

    for (const campo of camposParciais) {
      if (camposComDados[campo] != null) {
        condicoes.push(`${campo} LIKE ?`);
        valores.push(`%${camposComDados[campo]}%`);
      }
    }

    for (const campo of camposExatos) {
      if (camposComDados[campo] != null) {
        condicoes.push(`${campo} = ?`);
        valores.push(camposComDados[campo]);
      }
    }

    if (condicoes.length > 0) {
      sql += " WHERE " + condicoes.join(" AND ");
    }

    const [equipamentos] = await db.query(sql, valores);

    return equipamentos;
  },

  async buscarPorId(id) {
    const [equipamento] = await db.query(
      "SELECT * FROM equipamentos WHERE id = ?",
      [id],
    );

    return equipamento[0];
  },

  async atualizar(
    id,
    { cliente_id, tipo, local, identificador, marca, modelo, serie, tipo_gas },
  ) {
    const [equipamentoAtualizado] = await db.query(
      "UPDATE equipamentos SET cliente_id = ?, tipo = ?,local = ?, identificador = ?, marca = ?, modelo = ?, serie = ?, tipo_gas = ?   WHERE id = ?",
      [
        cliente_id,
        tipo,
        local,
        identificador,
        marca,
        modelo,
        serie,
        tipo_gas,
        id,
      ],
    );

    return {
      id,
      cliente_id,
      tipo,
      local,
      identificador,
      marca,
      modelo,
      serie,
      tipo_gas,
    };
  },

  async excluir(id) {
    await db.query("DELETE FROM equipamentos WHERE id = ?", [id]);

    return { Mensagem: "Equipamento excluido" };
  },
};

module.exports = equipamentoModel;
