function selecionarCampos(dados, camposPermitidos) {
    const camposSelecionados = {};

    for (const campo of camposPermitidos) {
        camposSelecionados[campo] = dados[campo];
    }

    return camposSelecionados;
}

module.exports = selecionarCampos;