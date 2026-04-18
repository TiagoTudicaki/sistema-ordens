function validarCamposVazios(camposObrigatorios) {
  return Object.entries(camposObrigatorios)
    .filter(([_, valor]) => !valor?.toString().trim())
    .map(([campo]) => campo);
}

function campoNomeSomenteTexto(nome) {
  return /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
}
function campoCidadeSomenteTexto(cidade) {
  return /^[A-Za-zÀ-ÿ\s]+$/.test(cidade);
}

function campoEnderecoSomenteTexto(endereco) {
  return (
    typeof endereco === "string" &&
    endereco.trim().length >= 5 &&
    /^[A-Za-zÀ-ÿ0-9\s,.-]+$/.test(endereco)
  );
}

function telefoneContemCaracterInvalido(telefone) {
  return /[^\d\s()-]/.test(telefone);
}

function cpfContemCaracterInvalido(cpf) {
  return /[^\d\s.-]/.test(cpf);
}

module.exports = {
  validarCamposVazios,
  campoNomeSomenteTexto,
  campoCidadeSomenteTexto,
  campoEnderecoSomenteTexto,
  telefoneContemCaracterInvalido,
  cpfContemCaracterInvalido,
};
