function Selo ({texto, tipo = "padrao"}){
    return <span className={`selo selo-${tipo}`}>{texto}</span>

}

export default Selo