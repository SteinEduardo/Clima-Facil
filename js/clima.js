class Clima{
    static async buscarCoordenadas(cidade){
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=10&language=pt&format=json`;
            const resposta = await fetch(url);
            const dados = await resposta.json();

            //console.log(dados);
            return dados;
    }
}