function salvarConfiguracoes() {
    const unidadeTemperatura = document.querySelector("#unidade-temperatura").value;

    if (window.cidadePadraoSelecionada) {
        localStorage.setItem("cidadePadrao", JSON.stringify(window.cidadePadraoSelecionada));
    }

    localStorage.setItem("unidadeTemperatura", unidadeTemperatura);

    alert("Configurações salvas");
}

function carregarConfiguracoes() {
    const cidadePadraoSalva = localStorage.getItem("cidadePadrao");
    const unidadeTemperatura = localStorage.getItem("unidadeTemperatura");

    if (cidadePadraoSalva) {
        const cidadePadrao = JSON.parse(cidadePadraoSalva);

        document.querySelector("#cidade-padrao").value = `${cidadePadrao.name}, ${cidadePadrao.admin1 || ""}, ${cidadePadrao.country}`;

        window.cidadePadraoSelecionada = cidadePadrao;
    }

    document.querySelector("#unidade-temperatura").value = unidadeTemperatura || "c";
}

async function voltarConfiguracoesPadrao() {
    const cidade = await ServicoGeocode.buscarInfoCidade("Curitiba");

    localStorage.setItem("cidadePadrao", JSON.stringify(cidade));
    localStorage.setItem("unidadeTemperatura", "c");
    
    document.querySelector("#cidade-padrao").value = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;
    document.querySelector("#unidade-temperatura").value = "c";

    window.cidadePadraoSelecionada = cidade;

    alert("Configurações padrão restauradas.");
}

function cidadePadraoBtn(cidade) {
    if (!cidade) {
        alert("Nenhuma cidade selecionada.");
        return;
    }

    localStorage.setItem("cidadePadrao", JSON.stringify(cidade));

    alert(`${cidade.name} definida como cidade padrão.`);
}

async function buscarCidadePadrao() {
    const inputCidade = document.querySelector("#cidade-padrao");
    const nomeCidade = inputCidade.value;
    const listaCidades = await ServicoGeocode.buscarListaCidades(nomeCidade);
    const containerLista = document.querySelector(".lista-cidade-padrao");

    containerLista.innerHTML = "";

    for (const cidade of listaCidades) {
        const botaoCidade = document.createElement("button");

        botaoCidade.type = "button";
        botaoCidade.classList.add("opcao-cidade");
        botaoCidade.textContent = `${cidade.name} - ${cidade.admin1 || ""}, ${cidade.country}`;

        botaoCidade.addEventListener("click", function () {
            window.cidadePadraoSelecionada = cidade;

            inputCidade.value = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;

            containerLista.innerHTML = "";
        });

        containerLista.appendChild(botaoCidade);
    }
}

const botaoSalvar = document.querySelector("#btn-salvar");

if (botaoSalvar) {
    botaoSalvar.addEventListener("click", salvarConfiguracoes);
}

const botaoVoltarPadrao = document.querySelector("#btn-voltar-padrao");

if (botaoVoltarPadrao) {
    botaoVoltarPadrao.addEventListener("click", voltarConfiguracoesPadrao);
}

const botaoBuscarCidadePadrao = document.querySelector("#btn-buscar-cidade-padrao");

if (botaoBuscarCidadePadrao) {
    botaoBuscarCidadePadrao.addEventListener("click", buscarCidadePadrao);
}

if (botaoSalvar || botaoVoltarPadrao || botaoBuscarCidadePadrao) {
    carregarConfiguracoes();
}