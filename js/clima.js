class ServicoGeocode {
  static async buscarInfoCidade(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=10&language=pt&format=json`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.results[0];
  }
}

class ServicoClima {
  static async buscarClimaAtual(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.current;
  }

  static async buscarPrevisaoDiaria(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.daily;
  }
}

function pegarCidadePadrao() {
  return localStorage.getItem("cidadePadrao") || "Curitiba";
}

async function infosDaCidade() {
  const cidadePadrao = pegarCidadePadrao();
  const cidade = await ServicoGeocode.buscarInfoCidade(cidadePadrao);
  const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude,);

  document.querySelector("#cidade-atual").textContent =`${cidade.name}, ${cidade.country}`;
  document.querySelector("#temperatura-atual").textContent =`${clima.temperature_2m}°C`;
  document.querySelector("#vento-atual").textContent =`${clima.wind_speed_10m} km/h`;
  document.querySelector("#umidade-atual").textContent =`${clima.relative_humidity_2m}%`;
  document.querySelector("#descricao-clima").textContent = "Clima atualizado";
}

async function previsaoCincoDias() {
  const cidade = await ServicoGeocode.buscarInfoCidade("Curitiba");
  const previsao = await ServicoClima.buscarPrevisaoDiaria(cidade.latitude, cidade.longitude,);
  const containerCincoDias = document.querySelector(".previsao-5dias");

  for (let i = 0; i < 5; i++) {
    containerCincoDias.innerHTML += `
        <article class="card-dia">
            <p>${previsao.time[i]}</p>
            <p>Máx: ${previsao.temperature_2m_max[i]}°C</p>
            <p>Mín: ${previsao.temperature_2m_min[i]}°C</p>
        </article>
    `;
  }
}

infosDaCidade();
previsaoCincoDias()
