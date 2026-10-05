
import { useState } from "react";
import Header from "./components/Header";
import SecaoCardapio from "./components/SecaoCardapio";
import Rodape from "./components/Rodape";
import { cardapio } from "./data/cardapio";
import "./App.css";

// Lista com os nomes das categorias, na ordem em que aparecem na tela.
const categorias = ["Prato Principal", "Sobremesa", "Bebida"];

function App() {
  const [totalItens, setTotalItens] = useState(0);

  function adicionarAoPedido(quantidade) {
    setTotalItens((totalAtual) => totalAtual + quantidade);
  }

  return (
    <main className="app">
      <Header totalItens={totalItens} />

      {/* Para cada categoria, uma SecaoCardapio só com os pratos daquela categoria */}
      {categorias.map((categoria) => (
        <SecaoCardapio
          key={categoria}
          titulo={categoria}
          pratos={cardapio.filter(
            (prato) => prato.categoria.toLowerCase() === categoria.toLowerCase()
          )}
          onAdicionar={adicionarAoPedido}
        />
      ))}

      <Rodape cidade="Itu/SP" />
    </main>
  );
}

export default App;