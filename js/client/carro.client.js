/**
 * Função responsável por enviar uma requisição GET para API Venda Carro
 * e armazenar o dado da resposta obtida (lista de carros cadastrados)
 */
async function getCarros() {
    const resposta = await axios.get("http://localhost:3000/carros");
    vetorCarros = resposta.data;
}

/**
 * Função responsável por enviar uma requisição GET para API Venda Carro
 * informando o id do carro a ser buscado como path param (parâmetro de rota/URL)
 * @param {Number} id - id do carro a ser buscado
 */
async function getCarroPorId(id) {
    const resposta = await axios.get("http://localhost:3000/carros/" + id);
    return resposta.data;
}

/**
 * Função responsável por enviar uma requisição POST para a API Venda Carro
 * @param {Object} carro - objeto carro a ser cadastrado
 */
async function postCarro(carro) {
    await axios.post("http://localhost:3000/carros", carro);
}

/**
 * Função responsável por enviar uma requisição PUT para a API Venda Carro
 * @param {Object} carro - objeto carro a ser autalizado
 */
async function putCarro(carro) {
    await axios.put("http://localhost:3000/carros", carro);
}

/**
 * Função responsável por enviar uma requisição DELETE para a API Venda Carro
 * @param {Number} carroId - ID do carro a ser removido
 */
async function deleteCarro(carroId){
    await axios.delete("http://localhost:3000/carros/" + carroId);
}