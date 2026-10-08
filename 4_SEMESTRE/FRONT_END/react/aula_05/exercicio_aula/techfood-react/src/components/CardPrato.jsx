import { useState } from "react";
import Selo from "./Selo";

// Aula 4 (E3): a quantidade não passa de 10
const QUANTIDADE_MAXIMA = 10;

function CardPrato({
  nome,
  preco,
  categoria,
  descricao,
  vegetariano = false, // Aula 5: valor padrão
  destaque = false, // Aula 5: valor padrão
  disponivel = true, // Aula 5: valor padrão
  // TODO (E2): receba a prop picante (valor padrão false)
  // TODO (E3): receba a prop precoPromocional
  onAdicionar,
}) {
  const [quantidade, setQuantidade] = useState(1);
  const [curtidas, setCurtidas] = useState(0); // Aula 4 (E2)
  const [mostrarDescricao, setMostrarDescricao] = useState(false); // Aula 4 (E4)

  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  function aumentar() {
    if (quantidade < QUANTIDADE_MAXIMA) {
      setQuantidade(quantidade + 1);
    }
  }

  function adicionar() {
    // TODO (E3): se tiver precoPromocional, o total do pedido deve usar o preço promocional
    onAdicionar(quantidade, preco);
    setQuantidade(1);
  }

  return (
    // Aula 5: ternário na classe — prato em destaque ganha borda vermelha
    <article className={destaque ? "card-prato destaque" : "card-prato"}>
      <span className="categoria">{categoria}</span>
      {/* Aula 3 (D1): emoji só na sobremesa */}
      <h2>
        {categoria === "Sobremesa" ? "🍰 " : ""}
        {nome}
      </h2>

      {/* Aula 5: && — o selo só aparece se a condição for verdadeira */}
      <div className="selos">
        {destaque && <Selo texto="Destaque" tipo="destaque" />}
        {vegetariano && <Selo texto="Vegetariano" tipo="veg" />}
        {!disponivel && <Selo texto="Esgotado" tipo="esgotado" />}
        {/* TODO (E2): selo "Picante" (tipo="picante") só quando picante for true */}
      </div>

      {/* TODO (E3): ternário — se tiver precoPromocional, mostre o preço antigo riscado
          (<s className="preco-antigo">) e o promocional; senão, só o preço normal. */}
      <p className="preco">{precoFormatado}</p>

      {/* Aula 3 (E3) prop descricao + Aula 4 (E4) mostrar/esconder */}
      {mostrarDescricao && <p className="descricao">{descricao}</p>}
      <button
        type="button"
        className="btn-secundario"
        onClick={() => setMostrarDescricao(!mostrarDescricao)}
      >
        {mostrarDescricao ? "Esconder descrição" : "Ver descrição"}
      </button>

      {/* Aula 5: ternário — disponível mostra os botões; esgotado mostra "Indisponível" */}
      {disponivel ? (
        <>
          <div className="quantidade">
            <button type="button" onClick={diminuir} aria-label={`Diminuir quantidade de ${nome}`}>
              −
            </button>
            <span>{quantidade}</span>
            <button type="button" onClick={aumentar} aria-label={`Aumentar quantidade de ${nome}`}>
              +
            </button>
          </div>

          <button type="button" className="btn-adicionar" onClick={adicionar}>
            Adicionar ao pedido
          </button>
        </>
      ) : (
        <button type="button" className="btn-indisponivel" disabled>
          Indisponível
        </button>
      )}
      <button type="button" className="btn-secundario" onClick={() => setCurtidas(curtidas + 1)}>
        ❤️ Curtir ({curtidas})
      </button>
    </article>
  );
}

export default CardPrato;
