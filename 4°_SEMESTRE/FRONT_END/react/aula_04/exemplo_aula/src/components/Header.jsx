function Header({ totalItens }){
    return(
        <header className="header" style={{ color: 'purple' }}>
            <h1>TechFood - Sabor & Saber</h1>
            <p> O sabor que ensina!</p>
            <p className="carrinho">Itens no pedido: {totalItens}</p>
        </header>
    )
}

export default Header