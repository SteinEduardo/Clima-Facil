/* 
    SISTEMA DE FAVORITOS
    Responsável por:
        Salvar cidades favoritas
        Evitar favoritos duplicados
        Recuperar favoritos do localStorage
        Permitir favoritar cidades de diferentes páginas
*/

// Recupera a lista de favoritos salva no navegador
function pegarFavoritos() {
    const favoritosSalvos = localStorage.getItem("favoritos");

    if (favoritosSalvos === null) {
        return [];
    }

    return JSON.parse(favoritosSalvos);
}

// Adiciona uma cidade aos favoritos
function favoritarCidade(cidadeAtual) {
    if (!cidadeAtual) {
        alert("Nenhuma cidade carregada.");
        return;
    }

    const favoritos = pegarFavoritos();
    const jaExiste = favoritos.some(cidade => cidade.id === cidadeAtual.id);

    // Verifica se a cidade já foi adicionada anteriormente
    if (jaExiste) {
        alert("Essa cidade já está nos favoritos");
        return;
    }

    // Adiciona a cidade à lista de favoritos
    favoritos.push(cidadeAtual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alert("Cidade adicionada aos favoritos com sucesso");
}

// FAVORITAR NA PÁGINA DE BUSCA
const botaoFavoritar = document.querySelector("#btn-favoritar");

if (botaoFavoritar) {
    botaoFavoritar.addEventListener("click", function () {
        favoritarCidade(window.cidadeSelecionada);
    });
}

// FAVORITAR CIDADE A DA COMPARAÇÃO
const botaoA = document.querySelector("#btn-favoritar-a");

if (botaoA) {
    botaoA.addEventListener("click", function () {
        favoritarCidade(window.cidadeComparacaoA);
    });
}

// FAVORITAR CIDADE B DA COMPARAÇÃO
const botaoB = document.querySelector("#btn-favoritar-b");

if (botaoB) {
    botaoB.addEventListener("click", function () {
        favoritarCidade(window.cidadeComparacaoB);
    });
}