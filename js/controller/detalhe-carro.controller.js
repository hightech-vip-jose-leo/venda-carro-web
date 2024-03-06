let id;
let carro = {}

async function buscarCarro() {
    let params = new URLSearchParams(location.search);
    id = params.get('id');
    // enviar requisição para API consultar o carro pelo id
    carro = await getCarroPorId(id);
    
    // preencher imagem
    document.getElementById("foto").src = carro.imagem;
    
    // preencher id
    document.getElementById("carroId").innerHTML = carro.id;
    
    // preencher modelo
    document.getElementById("carroModelo").innerHTML = carro.modelo;

    // preencher cor
    document.getElementById("carroCor").innerHTML = carro.cor;
    
    // preencher ano
    document.getElementById("carroAno").innerHTML = carro.ano;

    // preencher placa
    document.getElementById("carroPlaca").innerHTML = carro.placa;

    // preencher vendido (if ternário)
    document.getElementById("carroVendido").innerHTML = carro.vendido == true ? "Sim" : "Não"
    
}

buscarCarro();