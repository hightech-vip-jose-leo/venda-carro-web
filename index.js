
//criar variavel para o vetor de vetorCarros
// criar funcao salvar
//  acessar campos pelo document.getelement.byid para cada campo e pegar o valor (value) do campo
//   criar um novo objeto "carro" com os valores coletados
//    adicionar um novo objeto no vetor
//     limpar os campos

let vetorCarros = [];
let vetorCarrosCopia = [];
let idAtual = 0;
let idEdicao = 0;
let modoEdicao = false;

function adicionarCarro() {
    let modelo = document.getElementById("modelo").value;
    let cor = document.getElementById("cor").value;
    let ano = document.getElementById("ano").value;
    let placa = document.getElementById("placa").value;
    let imagem = document.getElementById("imagem").value;

    let carro = {
        modelo: modelo,
        cor: cor,
        ano: ano,
        placa: placa,
        imagem: imagem,
        vendido: false,
    };

    if (modoEdicao == true) {
        // salvar a edicao
        // 1. buscar o indice do carro a ser salvo utilizando o id edicao (findIndex) armazenar o indice em uma variavel local (let i)
        // 2. com o indice encontrado no passo anterior atribuir o objeto carro na posicao encontrada do vetor carros (vetorCarros[i] = carro)
        // 3. atribuir false na variavel global modoEdicao (modoEdicao = false)

        let i = vetorCarros.findIndex(function (carroDaVez) {
            return carroDaVez.id == idEdicao;
        });
        carro.id = idEdicao;
        vetorCarros[i] = carro;

        modoEdicao = false;
    } else {
        // adicionar carro novo
        carro.id = idAtual++;
        vetorCarros.push(carro);
    }

    document.getElementById("modelo").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("imagem").value = "";

    listarCarros();
}

// 1 criar função listar
// 1.1 limpando o Corpo da Tabela <Tbody>
// 2 buscar elemento tbody
// 3 criar um tr dentro do tbody
// 4 ao salvar um carro chamar a função listas

function listarCarros() {
    let corpoTabela = document.getElementById("corpoTabela");

    corpoTabela.innerHTML = "";

    // Chamar a funcao aplicar filtro
    aplicarFiltro();

    for (i = 0; i < vetorCarrosCopia.length; i++) {
        corpoTabela.innerHTML += `
          <tr>
            <td>
              <img class="imagem-carro" src="${vetorCarrosCopia[i].imagem}">
             
            </td>
            <td>${vetorCarrosCopia[i].id}</td>
            <td>${vetorCarrosCopia[i].modelo}</td>
            <td>${vetorCarrosCopia[i].cor}</td>
            <td>${vetorCarrosCopia[i].ano}</td>
            <td>${vetorCarrosCopia[i].placa}</td>
            <td>
              <input 
                onclick="checkVendido(${vetorCarrosCopia[i].id})" 
                type="checkbox" 
                ${vetorCarrosCopia[i].vendido ? "checked" : ""}/>
            </td>
            <td>
              <button onclick="editarCarro(${vetorCarrosCopia[i].id})">
                Editar
              </button>
              <button onclick="removerCarro(${vetorCarrosCopia[i].id})">
                Remover
              </button>
            </td>
          </tr>
          `;
    }
}

function aplicarFiltro() {
    // acessar opcao da selecao do filtro (pegar value do select escolhida pelo "usuario")
    let opcaoSelecionada = document.getElementById("filtro").value;

    // aplicar filter
    switch (opcaoSelecionada) {
        case "todos":
            vetorCarrosCopia = vetorCarros; // shallow copy
            break;
        case "vendido":
            // deep copy
            vetorCarrosCopia = vetorCarros.filter(function (carroDaVez) {
                return carroDaVez.vendido == true;
            });
            break;
        case "avenda":
            // deep copy
            vetorCarrosCopia = vetorCarros.filter(function (carroDaVez) {
                return carroDaVez.vendido == false;
            });
            break;
        default:
            console.log("escolheu opcao invalida");
            break;
    }
}

// 1 criar função checkVendido que recebera como parametro o id do carro
// 2 buscar o indice no vetor do carro que possui o id  fornecido no parametro
// 3 colocar vendido = true para o carro na posição do indice descoberto
function checkVendido(id) {
    let i = vetorCarros.findIndex(function (carro) {
        return carro.id == id;
    });
    vetorCarros[i].vendido = !vetorCarros[i].vendido;
}

// 1. Criar funcao remover carro que recebe como parametro o id do carro
// 2. Buscar o indice do vetor do carro que pussue o id = do parametro (utilizar metodo findIndex no vetor vetorCarros)
// 3. Remover o elemento do vetor vetorCarros do indice descoberto (utilizar metodo splice no vetor vetorCarros)
// 4. Relistar tabela de vetorCarros

function removerCarro(id) {
    let i = vetorCarros.findIndex(function (carro) {
        return carro.id == id;
    });

    vetorCarros.splice(i, 1);

    listarCarros();
}

// 1. Criar funcao editar carro que recebe como parametro o id do carro
// 2. Armazenar o id recebido como parametro em uma variavel global chamada "idEdicao"
// 3. Atribuir true na variavel global chamada "modoEdicao"
// 4. Buscar carro a ser editado no vetor vetorCarros utilizando o id recebido como parametro (find)
// 5. buscar input com getElementById e atribuir o value = ao atributo do carro edicao Ex: document.getElementById("modelo").value = carroEdicao.modelo
// 6. Alterar funcao adicionarCarro para alterar carro já existente (no vetor vetorCarros) quando o modo edicao for igual a true

function editarCarro(id) {
    modoEdicao = true;
    let carroEdicao = vetorCarros.find(function (carro) {
        return carro.id == id;
    });

    idEdicao = carroEdicao.id;

    document.getElementById("modelo").value = carroEdicao.modelo;
    document.getElementById("cor").value = carroEdicao.cor;
    document.getElementById("ano").value = carroEdicao.ano;
    document.getElementById("placa").value = carroEdicao.placa;
    document.getElementById("imagem").value = carroEdicao.imagem;
}

async function getCarros() {
    const resposta = await axios.get("http://localhost:3000/carros");
    vetorCarros = resposta.data;
    listarCarros();
}

getCarros();
