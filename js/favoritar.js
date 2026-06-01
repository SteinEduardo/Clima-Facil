function pegarFavoritos() {
    const favoritosSalvos = localStorage.getItem("favoritos");

    if (favoritosSalvos === null) {
        return [];
    }

    return JSON.parse(favoritosSalvos);
}

function favoritarCidade(cidadeAtual) {
    if (!cidadeAtual) {
        alert("Nenhuma cidade carregada.");
        return;
    }

    const favoritos = pegarFavoritos();
    const jaExiste = favoritos.some(cidade => cidade.id === cidadeAtual.id);

    if (jaExiste) {
        alert("Essa cidade já está nos favoritos");
        return;
    }

    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("Cidade adicionada aos favoritos com sucesso");
}

const botaoFavoritar = document.querySelector("#btn-favoritar");

if (botaoFavoritar) {
    botaoFavoritar.addEventListener("click", function () {
        favoritarCidade(window.cidadeSelecionada);
    });
}

const botaoA = document.querySelector("#btn-favoritar-a");

if (botaoA) {
    botaoA.addEventListener("click", function () {
        favoritarCidade(window.cidadeComparacaoA);
    });
}

const botaoB = document.querySelector("#btn-favoritar-b");

if (botaoB) {
    botaoB.addEventListener("click", function () {
        favoritarCidade(window.cidadeComparacaoB);
    });
}