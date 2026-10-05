import CardPrato from "./CardPrato"

function SecaoCardapio({ titulo, pratos, onAdicionar }) {
    return (
        <section className="secao">
            <h2 className="titulo-secao">{titulo}</h2>
            <div className="cardapio">
                {pratos.map((prato) => (
                    <CardPrato
                        key={prato.id}
                        nome={prato.nome}
                        preco={prato.preco}
                        categoria={prato.categoria}
                        descricao={prato.descricao}
                        vegetariano={prato.vegetariano}
                        destaque={prato.destaque}
                        disponivel={prato.disponivel}
                        onAdicionar={onAdicionar}
                    />
                ))}
            </div>
        </section>
    );
}

export default SecaoCardapio