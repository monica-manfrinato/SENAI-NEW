import { useState } from "react"

function CardPrato({nome, preco, categoria, descricao, curtidas, onAdicionar}){

    const [quantidade, setQuantidade] = useState(1)
    const [like, setLike] = useState(1)
    const [description, setDescription] = useState(false)

    const precoFormatado = preco.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})

    //funcionalidades de diminuir e aumentar

    function diminuir(){
        if(quantidade > 1){
            setQuantidade(quantidade - 1)
        }
    }

    function aumentar(){
        if(quantidade < 10){
        setQuantidade(quantidade + 1)
        }
    }

    function adicionar(){
        onAdicionar(quantidade, preco)
        setQuantidade(1)
    }

    function curtir(){
        setLike(like + 1)
    }

    function alternarDescricao(){
        setDescription(!description)
    }

    return(
        <article className="card-prato">
            <span className="categoria" > {categoria}</span>
            <h2>{nome}</h2>
            <p className="preco">{precoFormatado}</p>
            <button type="button" className="btn-descricao" onClick={alternarDescricao}>
                {description ? "Esconder descrição" : "Ver descrição"}
            </button>
            {description && <p className="descricao">{descricao}</p>}
            <div className="quantidade">
                <button type="button" onClick={diminuir} aria-label={`Diminuir quantidade de ${nome}`}> - </button>
                <span>{quantidade}</span>
                <button type="button" onClick={aumentar} aria-label={`Aumentar quantidade de ${nome}`}> + </button>
            </div>
            <button type='button' className="btn-adicionar" onClick={adicionar}> Adicionar ao pedido</button>
            <button type='button' className="btn-curtir" onClick={curtir}> Curtir {curtidas}</button>

        </article>
    )    
}

export default CardPrato