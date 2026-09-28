import Header  from "./components/Header"
import CardPrato from "./components/CardPrato"
import Rodape from "./components/Rodape"
import {cardapio} from "./data/cardapio"
import "./App.css"
import { useState } from "react"


function App(){
  const [totalItens, setTotalItens] = useState(0)
  const [totalValor, sertTotalValor] = useState(0)

  
  function adicionarPedido(quantidade, preco){
    setTotalItens(totalItens + quantidade)
    sertTotalValor(totalValor + quantidade*preco)
  }

  function limparPedido(){
    setTotalItens(0)
    sertTotalValor(0)
  }

  const totalFormatado = totalValor.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})

  return(
  <main className="app">
    <Header totalItens={totalItens}/>
    <section className="cardapio">
      {
        cardapio.map((prato) =>(
          <CardPrato
            key={prato.id}
            nome={prato.nome}
            preco={prato.preco}
            categoria={prato.categoria}
            descricao={prato.descricao}
            onAdicionar={adicionarPedido}
          />
        ))}
    </section>
    <p> Total do pedido: {totalFormatado}</p>
    <button type='button' className="btn-limparPedido" onClick={limparPedido}> Limpar Pedido</button>
  </main>
  )
}
export default App