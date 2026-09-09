// 1. SAUDAÇÃO DINÂMICA (Base Aula 5)
const saudacao = document.querySelector("#boas-vindas");
const hora = new Date().getHours();
if (saudacao) {
    saudacao.textContent =
        hora < 12
            ? "Bom dia! Qual o seu pedido?"
            : "Boa tarde! Confira nosso cardápio.";
}




// 2. INTERATIVIDADE NOS CARDS (Feedback visual)
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
    });
});



//3. DELEGAÇÃO DE EVENTOS

const main = document.querySelector("main")
main.addEventListener('click',(event)=>{
    const clicado = event.target //vai guardar quem foi clicado, mesmo que nós, desenvolvedores não saibamos seu nome

    //VERIFICAÇÕES

//3.1 QUANTIDADE DE ITENS
    if (clicado.classList.contains('btn-menos')){
        const box = clicado.parentElement //vai pegar o card em que está localizado o botão que foi clicado
        const textoQuantidade = box.querySelector(".qtd-valor")
        const valorAtual = Number(textoQuantidade.textContent) //pega o conteúdo de texto que está dentro do textoQuantidade (que está entre o + e -), precisa colocar o Number pq por natureza o valor vem como string
        textoQuantidade.textContent = Math.max(1,valorAtual - 1) //(o mínimo precisa ser 1, número de pratos após a redução)
        atualizarPrecoCard(box)
        return
    }

    if (clicado.classList.contains('btn-mais')){
        const box = clicado.parentElement //vai pegar o card em que está localizado o botão que foi clicado
        const textoQuantidade = box.querySelector(".qtd-valor")
        textoQuantidade.textContent = Number(textoQuantidade.textContent) + 1 //não vai ter valor mínimo ou máximo para realizar o pedido
        atualizarPrecoCard(box)
        return
    }


//3.2 AÇÃO DO BTN PEDIDO
    if (clicado.classList.contains("btn-pedido")){
        event.preventDefault()
        const card = clicado.parentElement
        const nomePrato = card.querySelector("h3").textContent //vai pegar o nome do prato que está no h3 do card
        const quantidade = card.querySelector('.qtd-valor').textContent
        const precoExibido = card.querySelector('.preco').textContent

        //Efeito visual quando clicado 'pedir agora'
        clicado.textContent = '👌 Adicionado'
        clicado.style.backgroundColor = '#206f17'
        clicado.disable = true //desativa temporariamente o botão para ele o usuário não ficar spamando clique
        setTimeout(() => {
            clicado.textContent = "Pedir agora"
            clicado.backgroundColor = "" //vazio faz ele voltar ao que era padrão no CSS
            clicado.disable = false
        },1500);

        if (!card.querySelector(".badge-adicionado")){
            card.insertAdjacentHTML(
                "beforeend", "<span class = 'badge-adicionado'> 👌 no resumo </span>"
            )
        }

        adicionarItemAoResumo(nomePrato, quantidade, precoExibido, card)
    }

}) //fim do main ouvinte click

//4. FUNÇÕES DE ATUALIZAR PREÇO E INSERIR PRODUTO NO RESUMO

//4.1 FUNÇÃO ATUALIZAR PREÇO CARD
function atualizarPrecoCard(box){ //nome só pra deixar igual mas poderia ser qualquer coisa
    const card = box.parentElement
    const textoQuantidade = card.querySelector(".preco")
    const precoUnitario = parseFloat(textoQuantidade.getAttribute("data-preco")) //pega o valor como o number, é só uma forma diferente
    //getAttribute pega um atributo do textoQuantidade
    const quantidade = Number(box.querySelector(".qtd-valor").textContent)

    const total = precoUnitario * quantidade
    textoQuantidade.textContent = "R$" + total.toFixed(2).replace(".", ",") //O replace substitui uma informação, troca oq aparece para oq eu quero q apareça, nesse caso oq é ponto no código vira vírgula no viusal
    textoQuantidade.style.color = total > 150 ? "#FFC07F" : "#F15156"

}

//4.2 FUNÇÃO ADICIONAR ITENS AO RESUMO

function adicionarItemAoResumo(nome, qtd, preco, cardOrigem){
    const secaoResumo = document.querySelector('#secao-resumo')
    const listaResumo = document.querySelector('#lista-resumo')

    if(!secaoResumo || !listaResumo)return

    secaoResumo.style.display = "block"

    //criando um item na lista (AINDA NÃO ESTÁ ADICIONADO NA TELA, SOMENTE FICA COMO VARIÁVEL GUARDADA)
    const itemLi = document.createElement("li")
    itemLi.classList.add('item-resumo')

    //informações - TEXTO
    const textoSpan = document.createElement("span")
    textoSpan.textContent = qtd + "x" + nome + " - " + preco

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



//4.3 BOTÃO REMOVER TODOS OS ITENS


const btnLimpar = document.querySelector("#btn-limpar")

if(btnLimpar){
    btnLimpar.addEventListener("click", () =>{
        const listaResumo = document.querySelector("#lista-resumo")
        const secaoResumo = document.querySelector("#secao-resumo")
        //pega todos os itens da class, o sem o 'All' pega só o 1° elemento
        //remover os badge criados pelo JS
        document.querySelectorAll(".badge-adicionado").forEach((b) => b.remove()) //passa em cada posição e apaga o que tiver nela

        //remover os filhos dessa lista
        while (listaResumo.firstElementChild) {
            listaResumo.firstElementChild.remove()            
        }
        secaoResumo.style.display = "none"
    })
}

