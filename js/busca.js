async function buscarCidade() {
  const inputCidade = document.querySelector("input");
  const nomeCidade = inputCidade.value;
  const listaCidades = await ServicoGeocode.buscarListaCidades(nomeCidade);
  const containerLista = document.querySelector(".lista-cidades");

  containerLista.innerHTML = "";

  for (const cidade of listaCidades) {
    const botaoCidade = document.createElement("button");

    botaoCidade.type = "button";
    botaoCidade.classList.add("opcao-cidade");

    botaoCidade.textContent = `${cidade.name} - ${cidade.admin1}, ${cidade.country}`;
    botaoCidade.addEventListener("click", async function () {
      const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);

      document.querySelector("#cidade-atual").textContent = `${cidade.name}, ${cidade.country}`;
      document.querySelector("#temperatura-atual").textContent = `${clima.temperature_2m}°${pegarSimboloTemperatura()}`;
      document.querySelector("#vento-atual").textContent =`${clima.wind_speed_10m} km/h`;
      document.querySelector("#umidade-atual").textContent = `${clima.relative_humidity_2m}%`;
      document.querySelector("#descricao-clima").textContent = traduzirClima(clima.weather_code);

      previsaoCincoDiasPorCoordenadas(cidade.latitude,cidade.longitude);

      containerLista.innerHTML = "";
    });

    containerLista.appendChild(botaoCidade);
  }
}

const botaoBuscar = document.querySelector("button");

botaoBuscar.addEventListener("click", buscarCidade);

//TORNAR PADRAO BOTAO
const botaoCidadePadrao = document.querySelector("#btn-cidade-padrao");

botaoCidadePadrao.addEventListener("click", function () {
    const cidadeAtual = document.querySelector("#cidade-atual").textContent;

    cidadePadraoBtn(cidadeAtual);
});