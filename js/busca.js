async function buscarCidade() {
    const inputCidade = document.querySelector("input");
    const nomeCidade = inputCidade.value;
    const cidade = await ServicoGeocode.buscarInfoCidade(nomeCidade);
    const clima =await ServicoClima.buscarClimaAtual(cidade.latitude,cidade.longitude);

    document.querySelector("#cidade-atual").textContent =`${cidade.name}, ${cidade.country}`;
    document.querySelector("#temperatura-atual").textContent =`${clima.temperature_2m}°C`;
    document.querySelector("#vento-atual").textContent =`${clima.wind_speed_10m} km/h`;
    document.querySelector("#umidade-atual").textContent =`${clima.relative_humidity_2m}%`;
}

const botaoBuscar = document.querySelector("button");

botaoBuscar.addEventListener("click",buscarCidade);