function validarCamposVazios(camposObrigatorios) {
  return Object.entries(camposObrigatorios)
    .filter(([_, valor]) => !valor?.toString().trim())
    .map(([campo]) => campo);
}

function validarTextoSimples(valor) {
  return /^[A-Za-zÀ-ÿ\s']+$/.test(valor);
}

function validarEndereco(endereco) {
  const palavras = endereco.trim().split(/\s+/);
  
  // Em endereços, só rejeita letras isoladas que NÃO sejam artigos/preposições
  const palavrasValidas = ["a", "à", "e", "o"];
  
  const letrasSozinhas = palavras.filter(p => 
    p.length === 1 && 
    !p.includes('.') &&
    !palavrasValidas.includes(p.toLowerCase())
  );
  
  if (letrasSozinhas.length > 0) {
    const erro = new Error(
      'Endereço parece incompleto. Verifique se há espaços extras.'
    );
    erro.status = 400;
    throw erro;
  }
  
  return endereco;
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

const tipos = [
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


function validarCampoEnumTipo(tipo) {
  
  if (!tipo.includes(tipo)){
    throw new Error("Tipo inválido");
  }

  return tipo;
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
  validarCampoEnumTipo,
  validarTextoSimplesOpcional
};
