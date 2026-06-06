/* CABEÇALHO DO SISTEMA
    Responsável por:
        Exibir a data atual
        Exibir a localização atual do usuário utilizando a geolocalização do navegador.
*/

// Atualiza o campo de data no cabeçalho
function carregarDataAtual() {
    const elementoData = document.querySelector("#data-atual");
    const dataAtual = new Date();

    elementoData.textContent = dataAtual.toLocaleDateString("pt-BR");
}

// Obtém a localização atual do usuário através do GPS do navegador e converte as coordenadas em cidade/estado
async function carregarLocalizacaoAtual() {
    const elementoLocalizacao = document.querySelector("#localizacao-atual");

    if (!navigator.geolocation) {
        elementoLocalizacao.textContent = "Localização indisponível";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function(posicao) {
            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;
            const local = await ServicoGeocode.buscarCidadePorCoordenadas(latitude, longitude);

            elementoLocalizacao.textContent = `${local.address.city || local.address.town || local.address.village || "Cidade não encontrada"}, ${local.address.state || ""}`;
        },

        // Executado quando o usuário nega a permissão
        function() {
            elementoLocalizacao.textContent = "Permissão negada";
        }
    );
}

carregarDataAtual();
carregarLocalizacaoAtual();