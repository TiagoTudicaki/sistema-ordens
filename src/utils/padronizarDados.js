function padronizarTexto(texto) {
 
  return texto
    .toLowerCase()
    .split(/\s+/)
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

function sanitizarTextoObrigatorios(texto){
  return texto.trim();
}

function sanitizarTextoOpcionais(texto){
  return texto?.trim() || null;
}

function limparCPF(cpf) {
  return String(cpf).replace(/\D/g, "");
}

function limparTelefone(telefone) {
  return String(telefone).replace(/\D/g, "");
}

function padronizarEndereco(endereco) {
  return String(endereco).normalize("NFC").replace(/\s+/g, " ");
}

function padronizarCidade(cidade) {
  const preposicoes = ["de", "da", "do", "dos", "das"];

  return cidade
    .toLowerCase()
    .split(/\s+/)
    .map((palavra, index) => {
      if (index !== 0 && preposicoes.includes(palavra)) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}

function normalizarEmail(email) {
  if (email == null) return email;
  return email.toLowerCase().trim();
}






module.exports = {
  padronizarTexto,
  sanitizarTextoObrigatorios,
  sanitizarTextoOpcionais,
  limparCPF,
  limparTelefone,
  padronizarEndereco,
  padronizarCidade,
  normalizarEmail,
 
};
