// Converte um objeto em array, filtra e devolve um objeto.
function consultaFiltrada(dados) {
  return Object.fromEntries(
    Object.entries(dados).filter(([_, valor]) => valor?.toString().trim()),
  );
}

function filtraConsultaEndereco(endereco) {
  return (
    typeof endereco === "string" &&
    endereco.trim().length >= 1 &&
    /^[A-Za-zÀ-ÿ0-9\s,.-]+$/.test(endereco)
  );
}

module.exports = { consultaFiltrada, filtraConsultaEndereco };
