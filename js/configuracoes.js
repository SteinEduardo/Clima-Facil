function salvarConfiguracoes(){
    const cidadePadrao = document.querySelector("#cidade-padrao").value;
    const unidadeTemperatura = document.querySelector("#unidade-temperatura").value;

    localStorage.setItem("cidadePadrao", cidadePadrao);
    localStorage.setItem("unidadeTemperatura",unidadeTemperatura);

    alert("Configurações salvas");
}

function carregarConfiguracoes(){
    const cidadePadrao = localStorage.getItem("cidadePadrao");
    const unidadeTemperatura = localStorage.getItem("unidadeTemperatura");
    
    document.querySelector("#cidade-padrao").value = cidadePadrao || "";
    document.querySelector("#unidade-temperatura").value = unidadeTemperatura || "c";
}

function voltarConfiguracoesPadrao() {
    localStorage.setItem("cidadePadrao", "Curitiba");
    localStorage.setItem("unidadeTemperatura", "c");

    document.querySelector("#cidade-padrao").value = "Curitiba";
    document.querySelector("#unidade-temperatura").value = "c";

    alert("Configurações padrão restauradas.");
}

function cidadePadraoBtn(nomeCidade) {

    if (nomeCidade === "") {
        alert("Nenhuma cidade selecionada.");
        return;
    }

    localStorage.setItem("cidadePadrao", nomeCidade);

    alert(`${nomeCidade} definida como cidade padrão.`);
}

const botaoSalvar = document.querySelector("#btn-salvar");

botaoSalvar.addEventListener("click",salvarConfiguracoes);

carregarConfiguracoes();

const botaoVoltarPadrao = document.querySelector("#btn-voltar-padrao");

botaoVoltarPadrao.addEventListener("click", voltarConfiguracoesPadrao);