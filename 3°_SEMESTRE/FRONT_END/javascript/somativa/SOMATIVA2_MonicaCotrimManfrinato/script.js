const CHAVE_STORAGE = "meus_jogos";


/* ============================================================
   1) INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  configurarFormulario();
  renderizarJogos();
});


/* ============================================================
   2) CONFIGURAR SUBMIT DO FORMULÁRIO
   ============================================================ */
function configurarFormulario() {
  const form = document.querySelector("#form-jogo");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const jogo = {
      titulo:     document.querySelector("#input-titulo").value,
      produtora:  document.querySelector("#input-produtora").value,
      nota:       Number(document.querySelector("#input-nota").value),
      plataforma: document.querySelector("#input-plataforma").value,
      comentario: document.querySelector("#input-comentario").value,

    };

    salvarJogo(jogo);
    form.reset();
    renderizarJogos();
  });
}


/* ============================================================
   3) SALVAR JOGO NO LOCALSTORAGE
   ============================================================ */
function salvarJogo(jogo) {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.push(jogo);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
}


/* ============================================================
   4) MOSTRAR OS JOGOS NA TELA
   ============================================================ */
function renderizarJogos() {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  const ul = document.querySelector("#lista-jogos");
  const msgVazio = document.querySelector("#msg-vazio");

  ul.innerHTML = "";
  
  if (lista.length === 0) {
    msgVazio.style.display = "block";
    return;
  }
  msgVazio.style.display = "none";

  lista.forEach(function (jogo, indice) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${jogo.titulo}</strong>
      <div class="meta">Produtora: ${jogo.produtora} • Nota: ${jogo.nota}/5</div>
      <div class="plataforma">Plataforma: "${jogo.plataforma}"</div>
      <div class="comentario">"${jogo.comentario}"</div>
      <button id="btn-excluir" class="btn-excluir" data-index="${indice}">Excluir</button>
    `;
    ul.appendChild(li);
  });
}


/* ============================================================
   5) DELEGAÇÃO DE EVENTOS — BOTÃO EXCLUIR
   ============================================================ */
document.querySelector("#lista-jogos").addEventListener("click", function (event) {

  // 🐛 ATENÇÃO: tem um bug aqui. O botão Excluir não funciona.
  //    Olhe com atenção como o botão é criado no innerHTML acima (função 4).
  if (event.target.id === "btn-excluir") {
    const indice = event.target.getAttribute("data-index");
    excluirJogo(indice);
  }
});


/* ============================================================
   6) EXCLUIR JOGO
   ============================================================ */
function excluirJogo(indice) {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.splice(indice, 1);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  renderizarJogos();
}


//LIMPAR TUDO

document.querySelector("#btn-limpar").addEventListener("click", function (event) {
const apagarTudo = confirm("Tem certeza de que deseja limpar tudo?")
if (apagarTudo){
  localStorage.removeItem(CHAVE_STORAGE);
  renderizarJogos()
}
});
