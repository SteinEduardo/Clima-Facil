class ServicoGeocode{
    static async buscarInfoCidade(cidade){
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=10&language=pt&format=json`;
            const resposta = await fetch(url);
            const dados = await resposta.json();

            return dados.results[0];
    }
}

class ServicoClima{
    static async buscarClimaAtual(latitude, longitude){
        const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        return dados.current;
    }
}

async function infosDaCidade() {
    const cidade = await ServicoGeocode.buscarInfoCidade("Curitiba");
    const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);
    document.querySelector("#cidade-atual").textContent = `${cidade.name}, ${cidade.country}`;
    document.querySelector("#temperatura-atual").textContent = `${clima.temperature_2m}°C`;
    document.querySelector("#vento-atual").textContent = `${clima.wind_speed_10m} km/h`;
    document.querySelector("#umidade-atual").textContent = `${clima.relative_humidity_2m}%`;
    document.querySelector("#descricao-clima").textContent = "Clima atualizado";
}

infosDaCidade();
