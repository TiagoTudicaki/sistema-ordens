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
  if(typeof identificador != "string"){
    throw new Error("Identificador inválido");
  }

   identificador = identificador.trim();

  const identificadorValido = /^[0-9]+$/.test(identificador);

   if(!identificadorValido){
    throw new Error("Identificador deve conter apenas dígitos, sem espaços ou outros caracteres");
   }

 

  if(identificador.length != 2){
    throw new Error("Identificador deve possuir 2 digitos");
   }
   

   return identificador;
}
function validarId(id) {
  
   if(typeof id != "number" && typeof id != "string"){
   throw new Error("ID inválido");
}
 const id_ApenasDigitos = /^[0-9]+$/.test(id);

if(!id_ApenasDigitos){
    throw new Error("Id deve ser numeros inteiros e positivos");
}

const id_Numerico = Number(id);

if(id_Numerico == 0){
    throw new Error("Id deve ser maior que zero");
}

return id_Numerico;
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
  if(typeof tipo != "string"){
    throw new Error("Tipo deve ser string");
  }
  if (!tipos.includes(tipo)){
    throw new Error("Tipo inválido");
  }

  return tipo;
}  

function validarTextoSimplesOpcional(valor) {
  if(valor == null) return true;
  return /^[A-Za-zÀ-ÿ\s']+$/.test(valor);
}

function validarLocal(local){
  if(typeof local !="string"){
    throw new Error("Local inválido");

  }

   const localValido =  /^[A-Za-zÀ-ÿ\s']+$/.test(local);

    if(!localValido){
      throw new Error("Local não deve possuir números, caracteres especiais");
    }

    return local;
}

function validarMarca(marca){
  if(typeof marca != "string"){
    throw new Error("Marca Inválida");
  }


  const marcaApenasCaracter = /^[A-Za-zÀ-ÿ\s']+$/.test(marca);

  if(!marcaApenasCaracter){
    throw new Error("Marca deve possuir apenas, letras, espaços e apostrofos");
  }

}

function validarModelo(modelo) {
  if (typeof modelo !== 'string') {
    throw new Error('Modelo deve ser uma string.');
  }

  const modeloTrim = modelo.trim();

  const regexModelo = /^[A-Za-z0-9-]+$/;

  if (!regexModelo.test(modeloTrim)) {
    throw new Error('Modelo deve conter apenas letras, números e traço.');
  }

  return modeloTrim;
}

function validarSerie(serie) {
  if (typeof serie !== 'string') {
    throw new Error('Série deve ser uma string.');
  }

  const serieTrim = serie.trim();

  const regexSerie = /^[A-Za-z0-9]+$/;

  if (!regexSerie.test(serieTrim)) {
    throw new Error('Série deve conter apenas letras e números.');
  }

  return serieTrim;
}

function validarcamposObrigatorios(dados, camposNecessarios){

  
  const camposFaltando = [];
  for(const campo of camposNecessarios){
    if(dados[campo] == null){
     camposFaltando.push(campo);
    }
  }

  if(camposFaltando.length > 0){
    if(camposFaltando.length > 1){
      throw new Error(`Os campos ${camposFaltando.join(", ")} são obrigatórios`);
    }else{
      throw new Error(`O campo ${camposFaltando} é obrigatório`);
    }
    
  }

  return dados;
}






module.exports = {
  validarCamposVazios,
  validarTextoSimples,
  validarEndereco,
  cpfContemCaracterInvalido,
  validarId,
  validarIdentificador,
  validarCampoEnumTipo,
  validarTextoSimplesOpcional,
  validarLocal,
  validarMarca,
  validarModelo,
  validarSerie,
  validarcamposObrigatorios,
};
