const BASE_URL = 'http://localhost:3000' //definindo a url em uma variável para poder simplificar seu uso no resto do código

//1. BUSCAR PRODUTOS

async function buscarProdutos() {
    const response = await fetch(`${BASE_URL}/produtos`) //realizar conexão (espera até receber resposta)
    const dados = await response.json()
    if (!response.ok) throw new Error(dados.erro || `Erro ${response.status}`) //armazena os dados (até receber os dados)

    return dados.dados
}

//2. CRIAR PEDIDO

async function criarPedido(cliente, itens) {
    //Solicita comunicação e executa o método POST (publica o cliente e os itens do pedido)
    const response = await fetch(`${BASE_URL}/pedidos`, { //realizar conexão, precisa repetir isso todas as vezes em todas as funções
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente, itens) //json, no tipo texto, string
    })
    const dados = await response.json()
    if (!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
}


//3. BUSCAR PEDIDOS (Foco para a cozinha)

async function buscarPedidos(){
    const response = await fetch(`${BASE_URL}/pedidos`)
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados
}


//4. EXCLUSÃO DO PEDIDO

async function deletarPedido(id){
    //chamamos o método delete (apagar pedido do banco de dados) - utilizado pela cozinha
    const response = await fetch(`${BASE_URL}/pedidos${id}`,{
        method: "DELETE",
    })
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    return dados
}

//5. ATUALIZAR DADOS PEDIDO

async function atualizarStatusPedido(id, atualizaStatus){
    const response = await fetch(`${BASE_URL}/pedidos${id}/status`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({atualizaStatus: novoStatus})
    })
    const dados = await response.json()

    if (!response.ok)throw new Error(dados.erro || `Erro ${response.status}`)
    return dados
}

