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
        equipamento_id || null,
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
      `SELECT 
            c.nome AS cliente_nome,
            c.telefone AS cliente_telefone,
            c.endereco AS cliente_endereco,
            c.cidade AS cliente_cidade,
            o.tipo_servico AS ordem_tipo_servico,
            o.status AS ordem_status,
            o.problema AS ordem_problema,
            o.diagnostico AS ordem_diagnostico,
            o.solucao AS ordem_solucao,
            o.detalhes AS ordem_detalhes,
            o.materiais AS ordem_materiais,
            o.checklist AS ordem_checklist,
            o.custo_total AS ordem_custo_total,
            e.tipo AS equipamento_tipo,
            e.local AS equipamento_local,
            e.identificador AS equipamento_identificador,
            e.marca AS equipamento_marca,
            e.modelo AS equipamento_modelo,
            e.serie AS equipamento_serie,
            e.capacidade_btu AS equipamento_capacidade_btu,
            e.tipo_gas AS equipamento_tipo_gas,
            t.nome AS tecnico_nome,
            o.criado_em AS ordem_criado_em,
            o.finalizado_em AS ordem_finalizado_em
        FROM ordens o
        LEFT JOIN clientes c ON o.cliente_id = c.id
        LEFT JOIN equipamentos e ON o.equipamento_id = e.id
        LEFT JOIN tecnicos t ON o.tecnico_id = t.id
            WHERE o.id = ?`,
      [id],
    );

    if(!ordem[0]){
      const erro = new Error("Ordem não encontrada");
      erro.status = 404;
      throw erro;
    }

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
