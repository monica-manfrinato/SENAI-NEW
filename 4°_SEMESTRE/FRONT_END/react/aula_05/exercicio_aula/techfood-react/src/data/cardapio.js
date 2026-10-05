// Dados do cardápio (Aula 4: separados da tela em src/data).
// Aula 5: cada prato ganhou 3 campos true/false — vegetariano, destaque e disponivel.
export const cardapio = [
  { id: 1, nome: "Feijoada", preco: 42.9, categoria: "Prato principal", descricao: "Feijão preto com carnes, arroz, couve e farofa.", vegetariano: false, destaque: true, disponivel: true },
  { id: 2, nome: "Moqueca", preco: 49.9, categoria: "Prato principal", descricao: "Peixe no leite de coco com dendê e pimentões.", vegetariano: false, destaque: false, disponivel: false },
  { id: 3, nome: "Pudim", preco: 15.0, categoria: "Sobremesa", descricao: "Pudim de leite condensado com calda de caramelo.", vegetariano: true, destaque: false, disponivel: true },
  { id: 4, nome: "Suco de caju", preco: 9.5, categoria: "Bebida", descricao: "Suco natural de caju, gelado.", vegetariano: true, destaque: false, disponivel: true },
  { id: 5, nome: "Brigadeiro", preco: 6.0, categoria: "Sobremesa", descricao: "Brigadeiro de chocolate belga.", vegetariano: true, destaque: true, disponivel: true },
  // TODO (E1): adicione uma bebida nova (id 6) com TODOS os campos (inclusive descricao).
  // TODO (E2): coloque picante: true em UM prato principal.
  // TODO (E3): coloque precoPromocional: 12.0 no Pudim.
];
