function validarCamposVazios(camposObrigatorios) {
  return Object.entries(camposObrigatorios)
    .filter(([_, valor]) => !valor?.toString().trim())
    .map(([campo]) => campo);
}

function validarNome(nome) {
    if (typeof nome != "string") {
        throw new Error("Nome deve ser texto");
    }

    const nomeLimpo = nome.trim().replace(/\s+/g, " ");

    if (nomeLimpo === "") {
        throw new Error("Nome não pode ser vazio");
    }

    if (!/^[A-Za-zÀ-ÿ\s']+$/.test(nomeLimpo)) {
        throw new Error("Nome deve possuir apenas letras e espaços");
    }

    return nomeLimpo;
}

function validarCpf(cpf) {
    if (typeof cpf != "string") {
        throw new Error("CPF deve ser texto");
    }

    const cpfLimpo = cpf.trim();

    if (cpfLimpo === "") {
        throw new Error("CPF não pode ser vazio");
    }

    if (/[^\d\s.-]/.test(cpfLimpo)) {
        throw new Error("CPF não deve conter letras ou caracteres especiais");
    }

    const cpfApenasDigitos = cpfLimpo.replace(/\D/g, "");

    if (cpfApenasDigitos.length != 11) {
        throw new Error("CPF deve conter 11 dígitos");
    }

    return cpfApenasDigitos;
}

function validarTelefone(telefone) {
    if (typeof telefone != "string") {
        throw new Error("Telefone deve ser texto");
    }

    const telefoneLimpo = telefone.trim();

    if (telefoneLimpo === "") {
        throw new Error("Telefone não pode ser vazio");
    }

    if (/[^\d\s\-()]/.test(telefoneLimpo)) {
        throw new Error("Telefone só deve possuir números, traços e parênteses");
    }

    const telefoneApenasDigitos = telefoneLimpo.replace(/\D/g, "");

    if (telefoneApenasDigitos.length != 10 && telefoneApenasDigitos.length != 11) {
        throw new Error("Telefone deve conter 10 ou 11 dígitos");
    }

    return telefoneApenasDigitos;
}

function validarCidade(cidade) {
    if (typeof cidade != "string") {
        throw new Error("Cidade deve ser texto");
    }

    const cidadeLimpa = cidade.trim();

    if (cidadeLimpa === "") {
        throw new Error("Cidade não pode ser vazia");
    }

    if (!/^[A-Za-zÀ-ÿ\s']+$/.test(cidadeLimpa)) {
        throw new Error("Cidade deve possuir apenas letras e espaços");
    }

    return cidadeLimpa;
}

function validarTextoSimples(valor) {
  return /^[A-Za-zÀ-ÿ\s']+$/.test(valor);
}

function validarEndereco(endereco) {
    if (typeof endereco != "string") {
        throw new Error("Endereço deve ser texto");
    }

    const enderecoLimpo = endereco.trim();

    if (enderecoLimpo === "") {
        throw new Error("Endereço não pode ser vazio");
    }

    return enderecoLimpo;
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



function validarCampoEnum(campo,tipos) {
  if(typeof campo != "string"){
    throw new Error(`${campo} deve ser string`);
  }
  if (!tipos.includes(campo)){
    throw new Error(`${campo} inválido`);
  }

  return campo;
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

function validarCamposObrigatorios(dados, camposNecessarios){

  
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

  
}

function validarTextoLivre(valor, nomeCampo, tamanhoMaximo) {
    if (typeof valor != "string") {
        throw new Error(`${nomeCampo} deve ser string`);
    }

    if (valor.length > tamanhoMaximo) {
        throw new Error(`${nomeCampo} não pode ultrapassar ${tamanhoMaximo} caracteres`);
    }

    return valor;
}






module.exports = {
  validarNome,
  validarCpf,
  validarTelefone,
  validarEndereco,
  validarCidade,
  validarCamposVazios,
  validarTextoSimples,
  cpfContemCaracterInvalido,
  validarId,
  validarIdentificador,
  validarCampoEnum,
  validarTextoSimplesOpcional,
  validarLocal,
  validarMarca,
  validarModelo,
  validarSerie,
  validarCamposObrigatorios,
  validarTextoLivre,
};
