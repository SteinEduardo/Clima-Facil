/*
  SERVIÇO DE GEOCODING
  Responsável por buscar informações de cidades, como nome, país, latitude e longitude.
*/

class ServicoGeocode {
  static async buscarInfoCidade(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=10&language=pt&format=json`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.results[0];
  }

  // Busca uma lista de possíveis cidades para o usuário escolher
  static async buscarListaCidades(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=10&language=pt&format=json`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.results;
  }

  static async buscarCidadePorCoordenadas(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
  }
}

/*
  SERVIÇO DE CLIMA 
  Responsável por buscar clima atual e previsão diária usando latitude e longitude.
 */
class ServicoClima {
  static async buscarClimaAtual(latitude, longitude) {
    const unidade = localStorage.getItem("unidadeTemperatura") || "c";
    let temperaturaApi = "celsius";

    // Define a unidade de temperatura usada pela API
    if (unidade === "f") {
      temperaturaApi = "fahrenheit";
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=${temperaturaApi}&timezone=auto`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.current;
  }

  // Busca previsão dos próximos 5 dias
  static async buscarPrevisaoDiaria(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.daily;
  }

  static async buscarPrevisaoHoraria(latitude, longitude) {
    const unidade = localStorage.getItem("unidadeTemperatura") || "c";
    let temperaturaApi = "celsius";

    if (unidade === "f") {
      temperaturaApi = "fahrenheit";
    }

    const url =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&temperature_unit=${temperaturaApi}&timezone=auto`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.hourly;
  }
}

/* 
  FUNÇÕES AUXILIARES
  Responsáveis por ler configurações e formatar dados antes de exibir para o usuário.
*/

// Retorna a cidade padrão salva ou Curitiba como fallback
function pegarCidadePadrao() {
  return localStorage.getItem("cidadePadrao") || "Curitiba";
}

// Retorna C ou F conforme a configuração do usuário
function pegarSimboloTemperatura() {
  const unidade = localStorage.getItem("unidadeTemperatura") || "c";

  return unidade.toUpperCase();
}

// Traduz o código climático WMO retornado pela API
function traduzirClima(codigo) {
  switch (codigo) {
    case 0:
      return "Céu limpo";

    case 1:
    case 2:
    case 3:
      return "Nublado";

    case 45:
    case 48:
      return "Nevoeiro";

    case 51:
    case 53:
    case 55:
      return "Garoa";

    case 56:
    case 57:
      return "Garoa congelante";

    case 61:
    case 63:
    case 65:
      return "Chuva";

    case 66:
    case 67:
      return "Chuva congelante";

    case 71:
    case 73:
    case 75:
      return "Neve";

    case 77:
      return "Grãos de neve";

    case 80:
    case 81:
    case 82:
      return "Pancadas de chuva";

    case 85:
    case 86:
      return "Pancadas de neve";

    case 95:
      return "Tempestade";

    case 96:
    case 99:
      return "Tempestade com granizo";

    default:
      return "Clima desconhecido";
  }
}

/*
  PAINEL CENTRAL
  Carrega a cidade padrão e mostra as informações atuais
*/
async function infosDaCidade() {
  const cidadePadraoSalva = localStorage.getItem("cidadePadrao");
  let cidade;

  /*
    Se existir cidade padrão salva, usa ela, caso contrário, usa Curitiba.
    */
  if (cidadePadraoSalva) {
    cidade = JSON.parse(cidadePadraoSalva);
  } else {
    cidade = await ServicoGeocode.buscarInfoCidade("Curitiba");
  }

  const clima = await ServicoClima.buscarClimaAtual(
    cidade.latitude,
    cidade.longitude,
  );

  document.querySelector("#cidade-atual").textContent =
    `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;
  document.querySelector("#temperatura-atual").textContent =
    `${clima.temperature_2m}°${pegarSimboloTemperatura()}`;
  document.querySelector("#vento-atual").textContent =
    `${clima.wind_speed_10m} km/h`;
  document.querySelector("#umidade-atual").textContent =
    `${clima.relative_humidity_2m}%`;
  document.querySelector("#descricao-clima").textContent = traduzirClima(
    clima.weather_code,
  );
}

/*
  PREVISÃO DE 5 DIAS
  Busca e monta os cards da previsão diária
*/
async function previsaoCincoDias(latitude, longitude) {
  const previsao = await ServicoClima.buscarPrevisaoDiaria(latitude, longitude);
  const containerCincoDias = document.querySelector(".previsao-5dias");

  containerCincoDias.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    containerCincoDias.innerHTML += `
        <article class="card-dia">
            <p>${previsao.time[i]}</p>
            <p>${traduzirClima(previsao.weather_code[i])}</p>
            <p>Máx: ${previsao.temperature_2m_max[i]}°${pegarSimboloTemperatura()}</p>
            <p>Mín: ${previsao.temperature_2m_min[i]}°${pegarSimboloTemperatura()}</p>
        </article>
    `;
  }
}

/*
  PREVISÃO DAS PRÓXIMAS HORAS
  Exibe apenas as próximas 5 previsões futuras, avançando de 2 em 2 horas a partir do horário atual.
*/ 
async function previsaoProximasHoras(latitude, longitude) {
  const previsao = await ServicoClima.buscarPrevisaoHoraria(latitude, longitude);
  const container = document.querySelector("#previsao-horaria");
  const agora = new Date();

  let linhaHora = "";
  let linhaTemp = "";
  let linhaClima = "";
  let contador = 0;

  // Percorre todas as previsões retornadas pela API
  for (let i = 0; i < previsao.time.length; i++) {
    const dataPrevisao = new Date(previsao.time[i]);

    // Exibe apenas horários futuros e limita a exibição a 5 previsões
    if (dataPrevisao >= agora && contador < 5) {
      const hora = previsao.time[i].split("T")[1].substring(0, 5);

      linhaHora += `<td>${hora}</td>`;
      linhaTemp += `<td>${previsao.temperature_2m[i]}°${pegarSimboloTemperatura()}</td>`;
      linhaClima += `<td>${traduzirClima(previsao.weather_code[i])}</td>`;

      contador++;
      i++;
    }
  }

  container.innerHTML = `
    <table class="tabela-previsao">
      <tr>${linhaHora}</tr>
      <tr>${linhaTemp}</tr>
      <tr>${linhaClima}</tr>
    </table>
  `;
}

// Atualiza o mapa com a cidade padrão
function carregarMapaCidade() {
    const iframe = document.querySelector("#mapa-cidade");

    if (!iframe) {
        return;
    }

    const cidadePadraoSalva = localStorage.getItem("cidadePadrao");

    let cidade;

    if (cidadePadraoSalva) {
        cidade = JSON.parse(cidadePadraoSalva);
    } else {
        cidade = {
            name: "Curitiba",
            country: "Brasil"
        };
    }

    iframe.src =
        `https://www.google.com/maps?q=${cidade.name},${cidade.country}&output=embed`;
}

infosDaCidade();
carregarMapaCidade();

// Carrega a previsão da cidade padrão ou de Curitiba
const cidadePadraoSalva = localStorage.getItem("cidadePadrao");

if (cidadePadraoSalva) {
  const cidadePadrao = JSON.parse(cidadePadraoSalva);

  previsaoCincoDias(cidadePadrao.latitude, cidadePadrao.longitude);
} else {
  previsaoCincoDias(-25.42778, -49.27306);
}

if (cidadePadraoSalva) {
    const cidadePadrao = JSON.parse(cidadePadraoSalva);

    previsaoCincoDias(cidadePadrao.latitude, cidadePadrao.longitude);
    previsaoProximasHoras(cidadePadrao.latitude, cidadePadrao.longitude);

} else {
    previsaoCincoDias(-25.42778, -49.27306);
    previsaoProximasHoras(-25.42778, -49.27306);
}
