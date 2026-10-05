// Aula 3 (E2) + Aula 5 (bônus): agora recebe props, e "ano" tem valor padrão.
function Rodape({ cidade, ano = 2026 }) {
  return (
    <footer className="rodape">
      <p>
        TechFood — Sabor & Saber · {cidade} · {ano}
      </p>
    </footer>
  );
}

export default Rodape;
