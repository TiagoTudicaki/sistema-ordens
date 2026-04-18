function tratarErro(res, erro) {
  return res.status(erro.status || 500).json({
    erro: erro.message || "Erro interno",
  });
}

module.exports = { tratarErro };
