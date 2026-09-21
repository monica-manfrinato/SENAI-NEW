import Header  from "./components/Header"
import CardPrato from "./components/CardPrato"
import Rodape from "./components/Rodape"

//temporário, apenas enquanto não conectamos e puxamos os pratos direto do back
const cardapio = [
  {
    id: 1,
    nome: "Feijoada",
    preco: 42.90, 
    categoria: "Prato Principal"
  },

  {
    id: 2,
    nome: "Moqueca",
    preco: 49.90, 
    categoria: "Prato Principal"
  },

  {
    id: 3,
    nome: "Pudim",
    preco: 15.00, 
    categoria: "Sobremesa"
  },

  {
    id: 4,
    nome: "Palha Italiana",
    preco: 7.00, 
    categoria: "Sobremesa"
  },

  {
    id: 5,
    nome: "Brownie",
    preco: 10.00, 
    categoria: "Sobremesa"
  },
]

function App(){
  return(
  <main className="app">
    <Header/>
    <section className="cardapio">
      {
        cardapio.map((prato) =>(
          <CardPrato
            key={prato.id}
            nome={prato.nome}
            preco={prato.preco}
            categoria={prato.categoria}
          />
        ))}
    </section>
  </main>
  )
}
export default App