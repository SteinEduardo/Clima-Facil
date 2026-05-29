function pegarFavoritos() {
    const favoritosSalvos = localStorage.getItem("favoritos");

    if (favoritosSalvos === null) {
        return [];
    }

    return JSON.parse(favoritosSalvos);
}

function favoritarCidade() {
    const cidadeAtual = document.querySelector("#cidade-atual").textContent;

    if (cidadeAtual === "") {
        return;
    }

    const favoritos = pegarFavoritos();

    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    console.log(`${cidadeAtual} adicionada aos favoritos`);
}

const botaoFavoritar = document.querySelector("#btn-favoritar");

if (botaoFavoritar) {

    botaoFavoritar.addEventListener("click", favoritarCidade);

}

