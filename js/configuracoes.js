/*
    CONFIGURAÇÕES DO SISTEMA
    Responsável por:
        Salvar cidade padrão
        Salvar unidade de temperatura
        Buscar cidades para definir como padrão
        Restaurar configurações iniciais
*/

// Salva as configurações escolhidas pelo usuário
function salvarConfiguracoes() {
    const unidadeTemperatura = document.querySelector("#unidade-temperatura").value;

    // Se o usuário selecionou uma cidade na lista,salva o objeto completo da cidade no localStorage
    if (window.cidadePadraoSelecionada) {
        localStorage.setItem("cidadePadrao", JSON.stringify(window.cidadePadraoSelecionada));
    }

    // Salva a unidade de temperatura escolhida
    localStorage.setItem("unidadeTemperatura", unidadeTemperatura);

    alert("Configurações salvas");
}

// Carrega as configurações salvas quando a página abre
function carregarConfiguracoes() {
    const cidadePadraoSalva = localStorage.getItem("cidadePadrao");
    const unidadeTemperatura = localStorage.getItem("unidadeTemperatura");

    // Se existir cidade padrão salva, exibe no input
    if (cidadePadraoSalva) {
        const cidadePadrao = JSON.parse(cidadePadraoSalva);

        document.querySelector("#cidade-padrao").value = `${cidadePadrao.name}, ${cidadePadrao.admin1 || ""}, ${cidadePadrao.country}`;

        // Mantém a cidade disponível para salvar novamente
        window.cidadePadraoSelecionada = cidadePadrao;
    }

    document.querySelector("#unidade-temperatura").value = unidadeTemperatura || "c";
}


// Restaura Curitiba e Celsius como configurações padrão
async function voltarConfiguracoesPadrao() {
    const cidade = await ServicoGeocode.buscarInfoCidade("Curitiba");

    localStorage.setItem("cidadePadrao", JSON.stringify(cidade));
    localStorage.setItem("unidadeTemperatura", "c");
    
    document.querySelector("#cidade-padrao").value = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;
    document.querySelector("#unidade-temperatura").value = "c";

    window.cidadePadraoSelecionada = cidade;

    alert("Configurações padrão restauradas.");
}

// Define uma cidade como padrão a partir de outras páginas
function cidadePadraoBtn(cidade) {
    if (!cidade) {
        alert("Nenhuma cidade selecionada.");
        return;
    }

    localStorage.setItem("cidadePadrao", JSON.stringify(cidade));

    alert(`${cidade.name} definida como cidade padrão.`);
}

// Busca sugestões de cidades para o campo "Cidade padrão"
async function buscarCidadePadrao() {
    const inputCidade = document.querySelector("#cidade-padrao");
    const nomeCidade = inputCidade.value;
    const listaCidades = await ServicoGeocode.buscarListaCidades(nomeCidade);
    const containerLista = document.querySelector(".lista-cidade-padrao");

    containerLista.innerHTML = "";

    // Cria um botão para cada cidade encontrada
    for (const cidade of listaCidades) {
        const botaoCidade = document.createElement("button");

        botaoCidade.type = "button";
        botaoCidade.classList.add("opcao-cidade");
        botaoCidade.textContent = `${cidade.name} - ${cidade.admin1 || ""}, ${cidade.country}`;

        // Ela só será salva ao clicar em "Salvar configurações".
        botaoCidade.addEventListener("click", function () {
            window.cidadePadraoSelecionada = cidade;

            inputCidade.value = `${cidade.name}, ${cidade.admin1 || ""}, ${cidade.country}`;

            containerLista.innerHTML = "";
        });

        containerLista.appendChild(botaoCidade);
    }
}

// EVENTOS DOS BOTÕES

// Botão salvar configurações
const botaoSalvar = document.querySelector("#btn-salvar");

if (botaoSalvar) {
    botaoSalvar.addEventListener("click", salvarConfiguracoes);
}

// Botão restaurar padrão
const botaoVoltarPadrao = document.querySelector("#btn-voltar-padrao");

if (botaoVoltarPadrao) {
    botaoVoltarPadrao.addEventListener("click", voltarConfiguracoesPadrao);
}

// Botão buscar cidade padrão
const botaoBuscarCidadePadrao = document.querySelector("#btn-buscar-cidade-padrao");

if (botaoBuscarCidadePadrao) {
    botaoBuscarCidadePadrao.addEventListener("click", buscarCidadePadrao);
}

// Carrega as configurações somente em páginas que possuem esses botões
if (botaoSalvar || botaoVoltarPadrao || botaoBuscarCidadePadrao) {
    carregarConfiguracoes();
}