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
        alert("Nenhuma cidade carregada.");
        return;
    }

    const favoritos = pegarFavoritos();

    if (favoritos.includes(cidadeAtual)) {
        alert("Essa cidade já está nos favoritos");
        return;
    }

    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("Cidade adicionada aos favoritos com sucesso");
}

//FAVORITAR NA PAGINA DE COMPARAÇÃO
function favoritarCidadeA() {
    const cidadeAtual = document.querySelector("#nome-cidade-a").textContent;

    if (cidadeAtual === "") {
        alert("Nenhuma cidade carregada.");
        return;
    }

    const favoritos = pegarFavoritos();

    if (favoritos.includes(cidadeAtual)) {
        alert("Essa cidade já está nos favoritos");
        return;
    }

    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("Cidade adicionada aos favoritos com sucesso");
}

function favoritarCidadeB() {
    const cidadeAtual = document.querySelector("#nome-cidade-b").textContent;

    if (cidadeAtual === "") {
        alert("Nenhuma cidade carregada.");
        return;
    }

    const favoritos = pegarFavoritos();

    if (favoritos.includes(cidadeAtual)) {
        alert("Essa cidade já está nos favoritos");
        return;
    }

    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("Cidade adicionada aos favoritos com sucesso");
}

const botaoFavoritar = document.querySelector("#btn-favoritar");

if (botaoFavoritar) {

    botaoFavoritar.addEventListener("click", favoritarCidade);

}

//FAVORITAR NA PAGINA DE COMPARAÇÃO
const botaoA = document.querySelector("#btn-favoritar-a");

if (botaoA) {
    botaoA.addEventListener("click",favoritarCidadeA);
}

const botaoB = document.querySelector("#btn-favoritar-b");

if (botaoB
) {
    botaoB.addEventListener("click",favoritarCidadeB);
}