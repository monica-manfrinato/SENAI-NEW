function Header({ totalItens, totalValor, onLimpar }) {
  const valorFormatado = totalValor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <header className="header">
      <h1>TechFood — Sabor & Saber</h1>
      <p>O sabor que ensina</p>
      <p className="carrinho">
        Itens no pedido: {totalItens} · Total: {valorFormatado}
      </p>
      <p>
        <button type="button" className="btn-secundario" onClick={onLimpar}>
          Limpar pedido
        </button>
      </p>
    </header>
  );
}

export default Header;
