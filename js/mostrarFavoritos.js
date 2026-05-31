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

    for (const cidadeNome of favoritos) {
        const cidade = await ServicoGeocode.buscarInfoCidade(cidadeNome);
        const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);

        containerFavoritos.innerHTML += `
            <article class="card-favorito">
                <h3>${cidade.name}</h3>
                <p>${traduzirClima(clima.weather_code)}</p>
                <p>Temperatura: ${clima.temperature_2m}°${pegarSimboloTemperatura()}</p>
                <p>Vento: ${clima.wind_speed_10m} km/h</p>
                <p>Umidade: ${clima.relative_humidity_2m}%</p>
                <button type="button" onclick="removerFavorito('${cidadeNome}')">
                    Remover
                </button>
            </article>
        `;
    }
}

function removerFavorito(nomeCidade) {
    const confirmar = confirm(`Deseja realmente remover ${nomeCidade} dos favoritos?`);

    if (!confirmar) {
        return;
    }

    const favoritos = pegarFavoritos();
    const favoritosAtualizados = favoritos.filter(cidade => cidade !== nomeCidade);

    localStorage.setItem("favoritos", JSON.stringify(favoritosAtualizados));

    carregarFavoritos();
}

carregarFavoritos();