class Prato {
  constructor(nome, preco, categoria) {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }

  formatarPreco() {
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
  }
}

const pratos = [
  new Prato('Feijoada Completa', 42.90, 'Prato Principal'),
  new Prato('Coxinha Artesanal', 8.50, 'Petisco'),
  new Prato('Brigadeiro Gourmet', 6.00, 'Sobremesa'),
];

function criarCard(prato) {
  const col = document.createElement("div");
  const card = document.createElement("article");
  col.className = "col";
  card.className = "card h-100 card-prato";

  // Adicionados os atributos data-bs-toggle e data-bs-target do Bootstrap
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title fw-bold">${prato.nome}</h5>
      <p class="card-text text-muted">${prato.categoria}</p>
      <p class="card-text fs-5 fw-bold text-success">
        ${prato.formatarPreco()}
      </p>
    </div>
    <div class="card-footer bg-transparent border-top-0 pb-3">
      <button 
        class="btn btn-danger w-100 btn-pedir" 
        data-bs-toggle="modal" 
        data-bs-target="#modalPedido"
      >
        Pedir Agora
      </button>
    </div>
  `;

  // Preenche os dados do prato no Modal ao clicar
  const btnPedir = card.querySelector('.btn-pedir');
  btnPedir.addEventListener('click', () => {
    document.querySelector('#modalTitulo').innerText = `Pedido: ${prato.nome}`;
    document.querySelector('#modalCorpo').innerHTML = `
      <p>Você selecionou o item <strong>${prato.nome}</strong> (${prato.categoria}).</p>
      <p class="fs-5 fw-bold text-success">Valor: ${prato.formatarPreco()}</p>
    `;
  });

  col.appendChild(card);
  return col;
}

const container = document.querySelector("#containerPratos");
pratos.forEach(p => container.appendChild(criarCard(p)));