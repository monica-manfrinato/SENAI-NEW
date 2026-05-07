//FUNÇÕES MAIORES, QUE SÃO A BASE PARA A PÁGINA (FUNÇÕES EXECUTADAS DENTRO DELAS N PRECISAM SER CHAMADAS AQUI)

document.addEventListener("DOMContentLoaded", function () {
  inicializarHoverCards();
  inicializarVitrine();
});

function inicializarHoverCards() {
  // 2. INTERATIVIDADE NOS CARDS (Feedback visual)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
}

function inicializarVitrine() {
  //3. DELEGAÇÃO DE EVENTOS
  const main = document.querySelector("main"); //pega o main do html
  if (!main) return; //se o main nem existe, n tem pq executar toda essa função, ent sai

  main.addEventListener("click", (event) => {
    const clicado = event.target; //vai guardar quem foi clicado, mesmo que nós, desenvolvedores não saibamos seu nome

    //VERIFICAÇÕES

    //3.1 QUANTIDADE DE ITENS
    if (clicado.classList.contains("btn-menos")) {
      const box = clicado.parentElement; //vai pegar o card em que está localizado o botão que foi clicado
      const textoQuantidade = box.querySelector(".qtd-valor");
      const valorAtual = Number(textoQuantidade.textContent); //pega o conteúdo de texto que está dentro do textoQuantidade (que está entre o + e -), precisa colocar o Number pq por natureza o valor vem como string
      textoQuantidade.textContent = Math.max(1, valorAtual - 1); //(o mínimo precisa ser 1, número de pratos após a redução)
      atualizarPrecoCard(box);
      return;
    }

    if (clicado.classList.contains("btn-mais")) {
      const box = clicado.parentElement; //vai pegar o card em que está localizado o botão que foi clicado
      const textoQuantidade = box.querySelector(".qtd-valor");
      textoQuantidade.textContent = Number(textoQuantidade.textContent) + 1; //não vai ter valor mínimo ou máximo para realizar o pedido
      atualizarPrecoCard(box);
      return;
    }

    //3.2 AÇÃO DO BTN PEDIDO
    if (clicado.classList.contains("btn-pedido")) {
      event.preventDefault();


      const card = clicado.parentElement;
      const nomePrato = card.querySelector("h3").textContent; //vai pegar o nome do prato que está no h3 do card
      const quantidade = Number(card.querySelector(".qtd-valor").textContent);
      const preco = parseFloat(card.querySelector(".preco").getAttribute("data-preco")); //'data-' é o atributo, PRECISA COLOCAR, o 'preco' é opcional, vc coloca oq quiser como nome dessa data

      //Efeito visual quando clicado 'pedir agora'
      clicado.textContent = "👌 Adicionado";
      clicado.style.backgroundColor = "#206f17";
      clicado.disable = true; //desativa temporariamente o botão para ele o usuário não ficar spamando clique
      setTimeout(() => {
        clicado.textContent = "Pedir agora";
        clicado.backgroundColor = ""; //vazio faz ele voltar ao que era padrão no CSS
        clicado.disable = false;
      }, 1500);

      const badgeExistente = card.querySelector(".badge-adicionado");
      if (badgeExistente) badgeExistente.remove(); //backup, caso o setTimeout não funcionar ele apaga, mas o timeout tem prioridade ali
      card.insertAdjacentHTML(
        "beforeend",
        "<span class = 'badge-adicionado'> 👌 no resumo </span>",
      );

      //DEFINIÇÃO DO TEMPO DE ESPERA PARA SUMIR COM O BADGE DA TELA
      setTimeout(function () {
        //Acabei de clicar no botão, quanto tempo ele vai se fixar até sumir?
        const badge = card.querySelector(".badge-adicionado");
        if (badge) badge.remove();
      }, 2000);

      //RESET QTD ITENS (limpa o número q aparece entre o + e o - para resetar) - NOVO

      const box = card.querySelector(".quantidade-box");
      if (box) {
        //se o box nem está adicionado
        box.querySelector(".qtd-valor").textContent = "1";
        //tem q estar em texto pq a função criada anteriormente já converte, ent precisamos dar o valor correto para ela
        atualizarPrecoCard(box);
      }

      //Acionar ação de salvar pedido() (webstorage pede 'chave','valor')
      salvarPedido({ nome: nomePrato, preco: preco, qtd: quantidade });

      atualizarContadorPedidos();
    }
  }); //fim do main ouvinte click
}

function atualizarPrecoCard(box) {
  //nome só pra deixar igual mas poderia ser qualquer coisa
  const card = box.parentElement;
  const textoQuantidade = card.querySelector(".preco");
  const precoUnitario = parseFloat(textoQuantidade.getAttribute("data-preco")); //pega o valor como o number, é só uma forma diferente
  //getAttribute pega um atributo do textoQuantidade
  const quantidade = Number(box.querySelector(".qtd-valor").textContent);

  const total = precoUnitario * quantidade;
  textoQuantidade.textContent = "R$" + total.toFixed(2).replace(".", ","); //O replace substitui uma informação, troca oq aparece para oq eu quero q apareça, nesse caso oq é ponto no código vira vírgula no viusal
  textoQuantidade.style.color = total > 150 ? "#FFC07F" : "#F15156";
}

function salvarPedido(pedido) {
  //COMANDOS DA AULA 08 (COISA NOVA)

  //o getItem vai ler, procurar se já existe uma chave
  // o techfood_pedidos vai ser criado anteriormente dessa execução, porém não é nesse arquivo, PRECISA EXISTIR ANTES
  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]"); //lista de pedidos, sequência de pedidos (precisa colocar JSON.parse(), que fornece os valores para o webstorage) Colocar '[]' garante q, msm q n encontre esse array informado primeiro, ele vai começar a inserir em outro array
  pedido.subtotal = pedido.preco * pedido.qtd;

  lista.push(pedido); //modificação realizada

  localStorage.setItem("techfood_pedidos", JSON.stringify(lista)); //precisa fazer isso para SALVAR
}

function atualizarContadorPedidos() {
  //CONTINUA...
}
