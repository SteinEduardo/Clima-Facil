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
                <p>Temperatura: ${clima.temperature_2m}°C</p>
                <p>Vento: ${clima.wind_speed_10m} km/h</p>
                <p>Umidade: ${clima.relative_humidity_2m}%</p>
            </article>
        `;
    }
}

carregarFavoritos();