//SUBSTITUINDO A SEÇÃO RESUMOS QUE FOI CRIADA NA AULA 7

document.addEventListener("DOMContentLoaded", function(){
    renderizarPedidos()
    //CONTINUA...
})



function renderizarPedidos(nome, qtd, preco, cardOrigem){

    const lista = document.querySelector("#lista-pedidos")
    const spanTotal = document.querySelector("#valor-total")
    const spanResumo = document.querySelector('#valor-total-resumo')
    const spanContador = document.querySelector('#contador-itens')

    if(!lista)return


    const pedidos = JSON.parse(localStorage.getItem("techfood_pedidos") || [])

    if(pedidos.length === 0){
        lista.innerHTML = "<li class='pedido-vazio'> Nenhum pedido ainda. Acesse o" + "<a href='index.html'> Cardápio </a> Para adicionar </li>"

        if(spanTotal) spanTotal.textContent = "R$0,00"
        if(spanResumo) spanResumo.textContent = "R$0,00"
        if(spanContador) spanContador.textContent = "0 itens"
    }

    lista.innerHTML = "" //zerando para n dar problema 
    let total = 0 //para conseguir acessar de outras funções 

    pedidos.array.forEach(function(pedido, indice){

    const li = document.createElement("li")
    li.classList.add("item-pedido")

    //informações - TEXTO
    const textoSpan = document.createElement("span")
    textoSpan.innerHTML = "<strong>" + pedido.nome + "</strong>" + '-' + pedido.qtd + "x" + "R$" + pedido.preco.toFixed(2).replace(".", ",") + " = <span class='subtotal-item'> R$" + pedido.subtotal.toFixed(2).replace(".", ",")

    //Botão para remover prato
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "❌"
    btnRemover.classList.add('btn-remover')

    btnRemover.addEventListener("click", ()=>{
        const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]")

        lista.splice(indice, 1)

        localStorage.setItem("techfood_pedidos")
        renderizarPedidos()

    }) //fim btn remover

        li.appendChild(textoSpan)
        li.appendChild(btnRemover)
        lista.appendChild(li)
        total += pedido.subtotal


    const totalFmt = "R$" + total.toFixed.repleace(".", ",")

    }) //FIM pedidos.forEach

    //jaja faremos
    //aqui q vai ser REALMENTE inserido na página, VISUALMENTE
    itemLi.appendChild(textoSpan)
    itemLi.appendChild(btnRemover)
    listaResumo.appendChild(itemLi)

    //FIM DA FUNÇÃO ADICIONAR ITEM AO resumo
}

function configurarLimparPedidos(){
    const btnLimpar = document.querySelector("btn-limpar-pedidos")

    if (!btnLimpar) return

    btnLimpar.addEventListener("click", function(){
        localStorage.removeItem("techfood_pedidos")
        renderizarPedidos()
    })
}