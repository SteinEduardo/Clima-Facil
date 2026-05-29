function salvarConfiguracoes(){
    const cidadePadrao = document.querySelector("#cidade-padrao").value;
    const unidadeTemperatura = document.querySelector("#unidade-temperatura").value;

    localStorage.setItem("cidadePadrao", cidadePadrao);
    localStorage.setItem("unidadeTemperatura",unidadeTemperatura);

    console.log("Configurações salvas");
}

function carregarConfiguracoes(){
    const cidadePadrao = localStorage.getItem("cidadePadrao");
    const unidadeTemperatura = localStorage.getItem("unidadeTemperatura");
    
    document.querySelector("#cidade-padrao").value = cidadePadrao || "";
    document.querySelector("#unidade-temperatura").value = unidadeTemperatura || "c";
}

const botaoSalvar = document.querySelector("#btn-salvar");

botaoSalvar.addEventListener("click",salvarConfiguracoes);

carregarConfiguracoes();