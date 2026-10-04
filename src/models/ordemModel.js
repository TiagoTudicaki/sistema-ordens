const db = require("../config/database");

const ordemModel = {
  async criar(dadosValidados){
    const {cliente_id, problema} = dadosValidados;
    const [resultado] = await db.query(
      "INSERT INTO ordens (cliente_id, problema) VALUES (?, ?)",
      [cliente_id, problema]
    );
    return {
      id: resultado.insertId,
      cliente_id,
      problema,
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
      ordens.id,
      ordens.problema,
      ordens.status,
      ordens.tipo_servico,
      ordens.categoria,
      ordens.executar,
      ordens.componente,
      ordens.diagnostico,
      ordens.solucao,
      ordens.materiais,
      ordens.mao_de_obra,
      ordens.custo_total,
      tecnicos.nome As tecnico_nome,
      clientes.nome As cliente_nome,
      clientes.endereco As cliente_endereco,
      clientes.cidade As cliente_cidade,
      clientes.telefone As cliente_telefone,
      equipamentos.tipo As equipamento_tipo,
      equipamentos.local As equipamento_local,
      equipamentos.identificador As equipamento_identificador,
      equipamentos.capacidade_btu As equipamento_capacidade_btu
       FROM ordens
       LEFT JOIN clientes ON ordens.cliente_id = clientes.id
       LEFT JOIN tecnicos ON ordens.tecnico_id = tecnicos.id
       LEFT JOIN equipamentos ON ordens.equipamento_id = equipamentos.id
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
