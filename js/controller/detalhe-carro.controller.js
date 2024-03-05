let id;

function buscarCarro() {
    let params = new URLSearchParams(location.search);
    id = params.get('id')
    console.log(id);
    // enviar requisição para API consultar o carro pelo id
}

buscarCarro();