function padronizarTexto(texto) {
  if (texto == null) return texto;

  const textoString = String(texto);

  return textoString
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

function limparCPF(cpf) {
  if (cpf == null) return cpf;

  return String(cpf).replace(/\D/g, "");
}

function padronizarEndereco(endereco) {
  if (endereco == null) return endereco;

  return String(endereco).normalize("NFC").trim().replace(/\s+/g, " ");
}

function normalizarEmail(email) {
  if (email == null) return email;
  return email.toLowerCase().trim();
}

function limparTelefone(telefone) {
  if (telefone == null) return telefone;
  return String(telefone).replace(/\D/g, "");
}

module.exports = {
  padronizarTexto,
  limparCPF,
  padronizarEndereco,
  normalizarEmail,
  limparTelefone,
};
