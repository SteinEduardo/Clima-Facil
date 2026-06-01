function pegarFavoritos() {
    const favoritosSalvos = localStorage.getItem("favoritos");

    if (favoritosSalvos === null) {
        return [];
    }

    return JSON.parse(favoritosSalvos);
}

async function carregarFavoritos() {
    const favoritos = pegarFavoritos();
    const containerFavoritos = document.querySelector(".favoritos-container");

    containerFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        containerFavoritos.innerHTML = "<p>Nenhuma cidade favorita salva.</p>";
        return;
    }

    for (const cidade of favoritos) {
        const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);

        containerFavoritos.innerHTML += `
            <article class="card-favorito">
                <h3>${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}</h3>
                <p>${traduzirClima(clima.weather_code)}</p>
                <p>Temperatura: ${clima.temperature_2m}°${pegarSimboloTemperatura()}</p>
                <p>Vento: ${clima.wind_speed_10m} km/h</p>
                <p>Umidade: ${clima.relative_humidity_2m}%</p>
                <button type="button" onclick="cidadePadraoBtn(${cidade.id})">
                    Tornar padrão
                </button>
                <button type="button" onclick="removerFavorito(${cidade.id})">
                    Remover
                </button>
            </article>
        `;
    }
}

function removerFavorito(idCidade) {
    const confirmar = confirm("Deseja realmente remover essa cidade dos favoritos?");

    if (!confirmar) {
        return;
    }

    const favoritos = pegarFavoritos();
    const favoritosAtualizados = favoritos.filter(cidade => cidade.id !== idCidade);

    localStorage.setItem("favoritos", JSON.stringify(favoritosAtualizados));

    carregarFavoritos();
}

function cidadePadraoBtn(idCidade) {
    const favoritos = pegarFavoritos();

    console.log("id recebido:", idCidade);
    console.log("favoritos:", favoritos);

    const cidade = favoritos.find(cidade => cidade.id === idCidade);

    if (!cidade) {
        alert("Cidade não encontrada.");
        return;
    }

    localStorage.setItem("cidadePadrao", JSON.stringify(cidade));

    alert(`${cidade.name} definida como cidade padrão.`);
}

carregarFavoritos();