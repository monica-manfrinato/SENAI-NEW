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



    //informações - TEXTO
    const textoSpan = document.createElement("span")
    textoSpan.innerHTML = //CONTINUAR!!!!!!/////////////////////////////////////////////////////////////////////////

    //Botão para remover prato
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "❌"
    btnRemover.classList.add('btn-remover')

    btnRemover.addEventListener("click", ()=>{
        itemLi.remove()

        const  badge = cardOrigem.querySelector(".badge-adicionado")
        if (badge) badge.remove()
        if (listaResumo.children.length === 0){
            secaoResumo.style.display = "none"
        }
    })

    //aqui q vai ser REALMENTE inserido na página, VISUALMENTE
    itemLi.appendChild(textoSpan)
    itemLi.appendChild(btnRemover)
    listaResumo.appendChild(itemLi)

    //FIM DA FUNÇÃO ADICIONAR ITEM AO resumo
}