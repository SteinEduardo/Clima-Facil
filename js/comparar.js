async function compararCidades(){
    const inputCidadeA = document.querySelector("#input-cidade-a");
    const inputCidadeB = document.querySelector("#input-cidade-b");

    const nomeCidadeA = inputCidadeA.value;
    const nomeCidadeB = inputCidadeB.value;

    const cidadeA = await ServicoGeocode.buscarInfoCidade(nomeCidadeA);
    const cidadeB = await ServicoGeocode.buscarInfoCidade(nomeCidadeB);

    const climaA = await ServicoClima.buscarClimaAtual(cidadeA.latitude, cidadeA.longitude);
    const climaB = await ServicoClima.buscarClimaAtual(cidadeB.latitude, cidadeB.longitude);
    
    //CIDADE A
    document.querySelector("#nome-cidade-a").textContent =`${cidadeA.name}, ${cidadeA.country}`;
    document.querySelector("#condicao-cidade-a").textContent = traduzirClima(climaA.weather_code);
    document.querySelector("#temperatura-cidade-a").textContent =`${climaA.temperature_2m}°${pegarSimboloTemperatura()}`;
    document.querySelector("#vento-cidade-a").textContent =`${climaA.wind_speed_10m} km/h`;
    document.querySelector("#umidade-cidade-a").textContent =`${climaA.relative_humidity_2m}%`;

    //CIDADE B
    document.querySelector("#nome-cidade-b").textContent =`${cidadeB.name}, ${cidadeB.country}`;
    document.querySelector("#condicao-cidade-b").textContent = traduzirClima(climaB.weather_code);
    document.querySelector("#temperatura-cidade-b").textContent =`${climaB.temperature_2m}°${pegarSimboloTemperatura()}`;
    document.querySelector("#vento-cidade-b").textContent =`${climaB.wind_speed_10m} km/h`;
    document.querySelector("#umidade-cidade-b").textContent =`${climaB.relative_humidity_2m}%`;

}

const botaoComparar = document.querySelector("#btn-comparar");

botaoComparar.addEventListener("click",compararCidades);
