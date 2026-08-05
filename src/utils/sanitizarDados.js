function valoresTrimados(dados) {
  return Object.fromEntries(
    Object.entries(dados).map(([chave, valor]) => 
      [chave, valor.trim()]
    ),
  );
}
