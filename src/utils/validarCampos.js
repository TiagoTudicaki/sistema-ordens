function validarCamposVazios(camposObrigatorios) {
  return Object.entries(camposObrigatorios)
    .filter(([_, valor]) => !valor?.toString().trim())
    .map(([campo]) => campo);
}

function validarTextoSimples(valor) {
  return /^[A-Za-zÀ-ÿ\s']+$/.test(valor);
}

function validarEndereco(endereco) {
  return endereco.length >= 5 && /^[A-Za-zÀ-ÿ0-9\s,.-]+$/.test(endereco);
}

function cpfContemCaracterInvalido(cpf) {
  return /[^\d\s.-]/.test(cpf);
}

function validarIdentificador(identificador) {
  return /^\d{1,4}$/.test(String(identificador).trim());
}

function validarIdPositivoInt(id) {
  return Number.isInteger(id) && id > 0;
}

const tiposValidos = [
    "acj",
    "hi-wall",
    "piso-teto",
    "multi-split",
    "cassete",
    "self-contained",
    "built-in",
    "vrf",
    "fan-coil",
    "roof-top",
  ];


function validarTipoDeAr(texto) {
  
  if (texto == null) return true;  
  return tiposValidos.includes(texto);
  
}

function validarTextoSimplesOpcional(valor) {
  if(valor == null) return true;
  return /^[A-Za-zÀ-ÿ\s']+$/.test(valor);
}






module.exports = {
  validarCamposVazios,
  validarTextoSimples,
  validarEndereco,
  cpfContemCaracterInvalido,
  validarIdPositivoInt,
  validarIdentificador,
  validarTipoDeAr,
  validarTextoSimplesOpcional
};
