import { useState } from "react";
import Header from "./components/Header";
import SecaoCardapio from "./components/SecaoCardapio";
import Rodape from "./components/Rodape";
import { cardapio } from "./data/cardapio";
import "./App.css";

// Aula 5: nomes das categorias, na ordem em que aparecem na tela
const categorias = ["Prato principal", "Sobremesa", "Bebida"];

function App() {
  // Aula 4 (bônus): total de itens do pedido — mora no App porque Header e CardPrato usam
  const [totalItens, setTotalItens] = useState(0);
  // Aula 4 (D2): total do pedido em R$
  const [totalValor, setTotalValor] = useState(0);

  function adicionarAoPedido(quantidade, preco) {
    setTotalItens(totalItens + quantidade);
    setTotalValor(totalValor + quantidade * preco);
  }

  // Aula 4 (D1): zera o pedido
  function limparPedido() {
    setTotalItens(0);
    setTotalValor(0);
  }

  return (
    <main className="app">
      <Header totalItens={totalItens} totalValor={totalValor} onLimpar={limparPedido} />
      {/* Aula 3 (D2): contador de pratos */}
      <p className="contador">Cardápio com {cardapio.length} itens</p>
      {/* Aula 5: uma seção para cada categoria, só com os pratos dela (.filter) */}
      {categorias.map((categoria) => (
        <SecaoCardapio
          key={categoria}
          titulo={categoria}
          pratos={cardapio.filter((prato) => prato.categoria === categoria)}
          onAdicionar={adicionarAoPedido}
        />
      ))}
      {/* Aula 3 (E2) */}
      <Rodape cidade="Itu/SP" />
    </main>
  );
}

export default App;
