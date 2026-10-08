// Aula 5: componente pequeno e reutilizável — o mesmo serve para Destaque, Vegetariano e Esgotado.
// tipo = "padrao" é o VALOR PADRÃO: vale quando o pai não manda a prop tipo.
function Selo({ texto, tipo = "padrao" }) {
  return <span className={`selo selo-${tipo}`}>{texto}</span>;
}

export default Selo;
