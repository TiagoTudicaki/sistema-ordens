function padronizarTexto(texto) {
const preposicoes = ["da", "de", "do", "das", "dos"];
 
  return texto
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*'\s*/g, "'")
    .split(/\s+/)
    .map((palavra,index) =>{
      if(index !== 0 && preposicoes.includes(palavra)){
        return palavra;
      }
       return palavra
      .split("'")
       .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
       .join("'");
      })
    
    .join(" ");
  } 

function sanitizarTextoObrigatorios(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function sanitizarTextoOpcionais(texto) {
  return texto?.trim() || null;
}

function padronizarCPF(cpf) {
  return cpf.replace(/\D/g, "");
}

function padronizarTelefone(telefone) {
  return String(telefone).replace(/\D/g, "");
}

function padronizarEndereco(texto) {
  const preposicoes = [
    "a",
    "à",
    "ao",
    "aos",
    "as",
    "às",
    "da",
    "das",
    "de",
    "do",
    "dos",
    "e",
    "em",
    "na",
    "nas",
    "no",
    "nos",
    "o",
    "os",
    "por",
    "para",
  ];
  //                    ↑ adiciona só essas 5 palavras extras

  return texto
    .trim()
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*'\s*/g, "'")
    .split(/\s+/)
    .map((palavra, index) => {
      if (index !== 0 && preposicoes.includes(palavra)) {
        return palavra;
      }
      return palavra
        .split("'")
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join("'");
    })
    .join(" ");
}

function padronizarCidade(texto) {
const preposicoes = ["da", "de", "do", "das", "dos"];
 
  return texto
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*'\s*/g, "'")
    .split(/\s+/)
    .map((palavra,index) =>{
      if(index !== 0 && preposicoes.includes(palavra)){
        return palavra;
      }
       return palavra
      .split("'")
       .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
       .join("'");
      })
    
    .join(" ");
  } 

function normalizarEmail(email) {
  if (email == null) return email;
  return email.toLowerCase().trim();
}

function padronizarTipoAr(texto) {
  if (texto == null) return null;
  return texto.toLowerCase().replace(/\s+/g, "-");
}

function padronizarCamposOpcionais(texto) {
  if (texto == null) return null;
  return texto.toLowerCase();
}

function padronizarLetrasNumeros(texto) {
  if (texto == null) return null;
  return texto.replace(/\s+/g, "").toLowerCase();
}

function padronizarCapacidade(capacidade) {
  return capacidade
  .replace(/\s+/g, "")
  .replace(/./g,"")
  .toLocaleUpperCase();

}

function padronizarTipoDeGas(tipo_gas){
  return tipo_gas
  .replace(/\-/g,"")
  .toLocaleUpperCase();
}

function padronizarModelo(modelo) {
  return modelo.toUpperCase();
}
  

module.exports = {
  padronizarTexto,
  sanitizarTextoObrigatorios,
  sanitizarTextoOpcionais,
  padronizarCPF,
  padronizarTelefone,
  padronizarEndereco,
  padronizarCidade,
  normalizarEmail,
  padronizarTipoAr,
  padronizarCamposOpcionais,
  padronizarLetrasNumeros,
  padronizarCapacidade,
  padronizarTipoDeGas,
  padronizarModelo,
}
