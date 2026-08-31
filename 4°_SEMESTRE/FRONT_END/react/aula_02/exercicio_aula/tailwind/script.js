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
  
  col.className = "h-full";
  card.className = "bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full";

  card.innerHTML = `
    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-900 mb-1">${prato.nome}</h3>
      <p class="text-sm text-gray-500 mb-3">${prato.categoria}</p>
      <p class="text-lg font-bold text-green-600">
        ${prato.formatarPreco()}
      </p>
    </div>
    <div class="mt-auto">
      <button 
        class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors btn-pedir"
      >
        Pedir Agora
      </button>
    </div>
  `;

  // Preenche os dados no modal ao clicar
  const btnPedir = card.querySelector('.btn-pedir');
  btnPedir.addEventListener('click', () => {
    document.querySelector('#modalTitulo').innerText = `Pedido: ${prato.nome}`;
    document.querySelector('#modalCorpo').innerHTML = `
      <p class="text-gray-700 mb-2">Você selecionou o item <strong class="text-gray-900">${prato.nome}</strong> (${prato.categoria}).</p>
      <p class="text-lg font-bold text-green-600">Valor: ${prato.formatarPreco()}</p>
    `;

    // Exibe o modal Tailwind (removendo a classe 'hidden' do elemento do modal)
    const modal = document.querySelector('#modalPedido');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  });

  col.appendChild(card);
  return col;
}

const container = document.querySelector("#containerPratos");
if (container) {
  pratos.forEach(p => container.appendChild(criarCard(p)));
}