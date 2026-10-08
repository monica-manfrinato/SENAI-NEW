class Bebida {
  constructor(nome, preco, volume) {
    this.nome = nome;
    this.preco = preco;
    this.volume = volume;
  }
  descricao() {
    return `${this.nome} - ${this.volume}ml - R$ ${this.preco.toFixed(2)}`;
  }

  emLitros(){
    return `${}`
  }
}

const bebidas = [
    new Bebida("Sprite", 5.90, 350),
    new Bebida("Fanta uva", 5.80, 350),
    new Bebida("Fanta laranja", 5.80, 350),
    new Bebida("Coca-cola", 5.80, 350),
];

console.log("===BEBIDAS===");
bebidas.forEach(b => {
  console.log(`${b.nome} - R$ ${b.preco}, ${b.volume}ml`);
});

const containerBebidas = document.querySelector("#lista-bebidas");

function criarCardBebidas(bebida) {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = bebida.descricao();
  return card;
}

function renderizarBebidas() {
  containerBebidas.innerHTML = "";
  bebidas.forEach(bebida => {
    const card = criarCardBebidas(bebida);
    containerBebidas.appendChild(card);
  });
}

renderizarBebidas();