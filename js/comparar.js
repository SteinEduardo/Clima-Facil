/*
    COMPARAÇÃO ENTRE CIDADES
    Responsável por:
        Buscar sugestões para Cidade A e Cidade B
        Permitir escolher a cidade correta
        Atualizar os cards de comparação
        Guardar as cidades escolhidas para favoritar depois
*/

// Atualiza o card de comparação com os dados da cidade escolhida
async function atualizarCardComparacao(cidade, tipoCidade) {
    const clima = await ServicoClima.buscarClimaAtual(cidade.latitude, cidade.longitude);

    if (tipoCidade === "a") {
        window.cidadeComparacaoA = cidade;

        document.querySelector("#nome-cidade-a").textContent = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;
        document.querySelector("#condicao-cidade-a").textContent = traduzirClima(clima.weather_code);
        document.querySelector("#temperatura-cidade-a").textContent = `${clima.temperature_2m}°${pegarSimboloTemperatura()}`;
        document.querySelector("#vento-cidade-a").textContent = `${clima.wind_speed_10m} km/h`;
        document.querySelector("#umidade-cidade-a").textContent = `${clima.relative_humidity_2m}%`;
    }

    if (tipoCidade === "b") {
        window.cidadeComparacaoB = cidade;

        document.querySelector("#nome-cidade-b").textContent = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;
        document.querySelector("#condicao-cidade-b").textContent = traduzirClima(clima.weather_code);
        document.querySelector("#temperatura-cidade-b").textContent = `${clima.temperature_2m}°${pegarSimboloTemperatura()}`;
        document.querySelector("#vento-cidade-b").textContent = `${clima.wind_speed_10m} km/h`;
        document.querySelector("#umidade-cidade-b").textContent = `${clima.relative_humidity_2m}%`;
    }
}

// Cria a lista de possíveis cidades para Cidade A ou Cidade B
async function mostrarListaComparacao(inputId, listaClasse, tipoCidade) {
    const inputCidade = document.querySelector(inputId);
    const nomeCidade = inputCidade.value;
    const containerLista = document.querySelector(listaClasse);

    if (nomeCidade.trim() === "") {
        alert("Digite o nome da cidade.");
        return;
    }

    containerLista.innerHTML = "<p>Pesquisando cidades...</p>";

    const listaCidades = await ServicoGeocode.buscarListaCidades(nomeCidade);

    if (!listaCidades) {
        containerLista.innerHTML = `<p>Nenhuma cidade encontrada para "${nomeCidade}".</p>`;
        return;
    }

    containerLista.innerHTML = "";

    // Cria um botão para cada cidade encontrada
    for (const cidade of listaCidades) {
        const botaoCidade = document.createElement("button");

        botaoCidade.type = "button";
        botaoCidade.classList.add("opcao-cidade");
        botaoCidade.textContent = `${cidade.name} - ${cidade.admin1 || ""}, ${cidade.country}`;

        botaoCidade.addEventListener("click", function () {
            atualizarCardComparacao(cidade, tipoCidade);
            containerLista.innerHTML = "";
        });

        containerLista.appendChild(botaoCidade);
    }
}

async function compararCidades() {
    await mostrarListaComparacao("#input-cidade-a", ".lista-cidades-a", "a");
    await mostrarListaComparacao("#input-cidade-b", ".lista-cidades-b", "b");
}

// Botão principal da página de comparação
const botaoComparar = document.querySelector("#btn-comparar");

botaoComparar.addEventListener("click", compararCidades);

//PESQUISAR COM O ENTER
const inputCidadeA = document.querySelector("#input-cidade-a");
const inputCidadeB = document.querySelector("#input-cidade-b");

if (inputCidadeA) {
    inputCidadeA.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            compararCidades();
        }
    });
}

if (inputCidadeB) {
    inputCidadeB.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            compararCidades();
        }
    });
}