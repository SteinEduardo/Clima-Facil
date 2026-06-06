/*
  BUSCA AVANÇADA DE CIDADES
  Responsável por:
    Buscar cidades na API Geocoding
    Exibir lista de sugestões
    Atualizar clima atual da cidade escolhida
    Atualizar previsão dos próximos 5 dias
*/

async function buscarCidade() {
  const inputCidade = document.querySelector("input");
  const nomeCidade = inputCidade.value;
  const containerLista = document.querySelector(".lista-cidades");

  if (nomeCidade.trim() === "") {
    alert("Digite o nome de uma cidade.");
    return;
  }

  containerLista.innerHTML = "<p>Pesquisando cidades...</p>";

  const listaCidades = await ServicoGeocode.buscarListaCidades(nomeCidade);

  if (!listaCidades) {
    containerLista.innerHTML = `<p>Nenhuma cidade encontrada para "${nomeCidade}".</p>`;
    return;
  }

  containerLista.innerHTML = "";

  for (const cidade of listaCidades) {
    const botaoCidade = document.createElement("button");

    botaoCidade.type = "button";
    botaoCidade.classList.add("opcao-cidade");

    botaoCidade.textContent = `${cidade.name} - ${cidade.admin1}, ${cidade.country}`;
    botaoCidade.addEventListener("click", async function () {
      const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);

      // Armazena a cidade selecionada para uso em favoritos e definição de cidade padrão
      window.cidadeSelecionada = cidade;

      document.querySelector("#cidade-atual").textContent = `${cidade.name},  ${cidade.country}`;
      document.querySelector("#temperatura-atual").textContent = `${clima.temperature_2m}°${pegarSimboloTemperatura()}`;
      document.querySelector("#vento-atual").textContent =`${clima.wind_speed_10m} km/h`;
      document.querySelector("#umidade-atual").textContent = `${clima.relative_humidity_2m}%`;
      document.querySelector("#descricao-clima").textContent = traduzirClima(clima.weather_code);

      previsaoCincoDias(cidade.latitude,cidade.longitude);

      containerLista.innerHTML = "";
    });

    containerLista.appendChild(botaoCidade);
  }
}

// BOTÃO DE BUSCA
const botaoBuscar = document.querySelector("button");

botaoBuscar.addEventListener("click", buscarCidade);

//TORNAR PADRAO BOTAO
const botaoCidadePadrao = document.querySelector("#btn-cidade-padrao");

botaoCidadePadrao.addEventListener("click", function () {
    cidadePadraoBtn(window.cidadeSelecionada);
});

//PESQUISAR COM O ENTER
const inputBusca = document.querySelector("input");

if (inputBusca) {
    inputBusca.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            buscarCidade();
        }
    });
}