//ORIENTAÇÃO A OBJETO

class Prato{
    constructor(nome, preco, categoria){
        this.nome = nome
        this.preco = preco
        this.categoria = categoria
    }

    formatarPreco(){
        return `R$ ${this.preco.toFixed(2).replace(".", ",")}`
    }

    aplicarDesconto(percentual){
        this.preco = this.preco * (1 - percentual / 100)
    }
} //fim da class

const cardapio = [
    new Prato("Feijoada completa", 42.90, "Prato Principal"),
    new Prato ("Moqueca de peixe", 58.90, "Prato Principal"),
    new Prato ("Coxinha artesanal", 8.50, "Petisco"),
    new Prato ("Brigadeiro Gourmet", 6.00, "Sobremesa"),
    new Prato ("Suco de Maracujá", 12.00, "Bebidas")
]

console.log("===Pratos Criados===")
cardapio.forEach(p =>{
    console.log(`${p.nome} -> ${p.formatarPreco()}`)
})


//DOM

const containerCardapio = document.querySelector("#cardapio")

function criarCardPrato(prato){
    const card = document.createElement("div")
    card.className = 'card'

    card.innerHTML = `
    <h3> ${prato.nome}</h3>
    <span class="categoria">${prato.categoria}</span>
    <div class="preco">${prato.formatarPreco()}</div>
    `

    card.addEventListener('click', () =>{
        alert(
            `🚀🚀🚀🚀🚀🚀 ${prato.nome} \n\n` +
            `Categoria: ${prato.categoria} \n\n ` +
            `Preço: ${prato.formatarPreco()}`

        )
    })
    return card
} //fim função criarCardPrato()

function renderizarCardapio(){
    containerCardapio.innerHTML = " "

    cardapio.forEach(prato => {
        const card = criarCardPrato(prato)
        containerCardapio.appendChild(card)
    })
}

renderizarCardapio()

    cardapio[0].aplicarDesconto(20)

renderizarCardapio()
