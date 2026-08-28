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
      `SELECT 
       
       
       clientes.nome AS cliente_nome,
       equipamentos.tipo,
       equipamentos.local,
       equipamentos.identificador,
       equipamentos.marca,
       equipamentos.modelo,
       equipamentos.serie,
       equipamentos.capacidade_btu,
       equipamentos.tipo_gas,
       equipamentos.criado_em
     FROM equipamentos
     JOIN clientes ON equipamentos.cliente_id = clientes.id
     WHERE equipamentos.id = ?`,
      [id],
    );

    return equipamento[0];
  },

  async atualizar(id, dados)
     {
    
    const campo = [];
    const valor = [];

    if(dados.cliente_id != null){
      campo.push("cliente_id = ?");
      valor.push(dados.cliente_id);
    }

    if(dados.tipo != null){
      campo.push("tipo = ?");
      valor.push(dados.tipo);
    }

    if(dados.local != null){
      campo.push("local = ?");
      valor.push(dados.local);
    }

    if(dados.identificador != null){
      campo.push("identificador = ?");
      valor.push(dados.identificador);
    }

    if(dados.marca != null){
      campo.push("marca = ?");
      valor.push(dados.marca);
    }

    if(dados.modelo != null){
      campo.push("modelo = ?");
      valor.push(dados.modelo);
    }

    if(dados.serie != null){
      campo.push("serie = ?");
      valor.push(dados.serie);
    }

    if(dados.capacidade_btu != null){
      campo.push("capacidade_btu = ?");
      valor.push(dados.capacidade_btu);
    }

    if(dados.tipo_gas != null){
      campo.push("tipo_gas = ?");
      valor.push(dados.tipo_gas);
    }

    valor.push(id);

    const [resultado] = await db.query(`UPDATE equipamentos SET ${campo.join(", ")} WHERE id = ?`, valor);
    return resultado;

     
  },

  async excluir(id) {
    await db.query("DELETE FROM equipamentos WHERE id = ?", [id]);

    return { Mensagem: "Equipamento excluido" };
  },
};

module.exports = equipamentoModel;
