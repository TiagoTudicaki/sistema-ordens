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

function filtrarCampos(dados, camposPermitidos) {
  const camposFiltrados = {};
  const camposInvalidos = [];

  for (const campo of camposPermitidos) {
    const valor = dados[campo];

    if (valor == null) continue;

    if (typeof valor != "string") {
      camposInvalidos.push(campo);
      continue;
    }
    if (valor.trim() === "") continue;

    camposFiltrados[campo] = valor;
  }

  if (camposInvalidos.length > 0) {
    throw new Error(`${camposInvalidos.join(", ")} devem ser string`);
  }

  return camposFiltrados;
}

module.exports = {
  consultaFiltrada,
  filtraConsultaEndereco,
  filtrarCampos,
};
