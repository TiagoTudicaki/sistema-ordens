const db = require("../config/database");

const ordemModel = {
  async criar({
    cliente_id,
    equipamento_id,
    tecnico_id,
    tipo_servico,
    problema,
    diagnostico,
    solucao,
    detalhes,
    materiais,
    checklist,
  }) {
    const [novaOrdem] = await db.query(
      "INSERT INTO ordens(cliente_id, equipamento_id, tecnico_id, tipo_servico, problema, diagnostico, solucao, detalhes, materiais, checklist)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        cliente_id,
        equipamento_id,
        tecnico_id || null,
        tipo_servico,
        problema || null,
        diagnostico || null,
        solucao || null,
        detalhes || null,
        materiais || null,
        checklist || null,
      ],
    );

    return {
      id: novaOrdem.insertId,
      cliente_id,
      equipamento_id,
      tecnico_id,
      tipo_servico,
      problema,
      diagnostico,
      solucao,
      detalhes,
      materiais,
      checklist,
    };
  },

  async listar() {
    const [ordens] = await db.query(
      `SELECT 
            ordens.id,
            ordens.tipo_servico,
            ordens.status,
            ordens.criado_em,
            clientes.nome As cliente_nome,
            tecnicos.nome AS tecnico_nome         
        FROM ordens
        LEFT JOIN clientes ON ordens.cliente_id = clientes.id
        LEFT JOIN tecnicos ON ordens.tecnico_id = tecnicos.id`,
    );

    return ordens;
  },

  async buscarPorId(id) {
    const [ordem] = await db.query(
      `SELECT ordens.*,
            clientes.nome AS cliente_nome,
            equipamentos.marca AS equipamento_marca,
            tecnicos.nome AS tecnico_nome
        FROM ordens
        LEFT JOIN clientes ON ordens.cliente_id = clientes.id
        LEFT JOIN equipamentos ON ordens.equipamento_id = equipamentos.id
        LEFT JOIN tecnicos ON ordens.tecnico_id = tecnicos.id
            WHERE ordens.id = ?`,
      [id],
    );

    return ordem[0];
  },

  async atualizar(id, dados) {
    const {
      cliente_id,
      equipamento_id,
      tecnico_id,
      tipo_servico,
      problema,
      diagnostico,
      solucao,
      detalhes,
      materiais,
      checklist,
    } = dados;

    const [ordemAtualizada] = await db.query(
      `UPDATE ordens SET cliente_id = ?, equipamento_id = ?, tecnico_id = ?,
            tipo_servico = ?, problema = ?, diagnostico = ?, solucao = ?, detalhes = ?,
            materiais = ?, checklist = ? WHERE id = ?`,
      [
        cliente_id,
        equipamento_id,
        tecnico_id || null,
        tipo_servico,
        problema || null,
        diagnostico || null,
        solucao || null,
        detalhes || null,
        materiais || null,
        checklist || null,
        id,
      ],
    );

    return {
      id,
      cliente_id,
      equipamento_id,
      tecnico_id,
      tipo_servico,
      problema,
      diagnostico,
      solucao,
      detalhes,
      materiais,
      checklist,
    };
  },

  async excluir(id) {
    await db.query("DELETE FROM ordens WHERE id = ?", [id]);

    return { mensagem: "ordem excluida com sucesso" };
  },
};

module.exports = ordemModel;
