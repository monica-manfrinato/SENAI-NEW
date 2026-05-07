//TODA VEZ QUE FOR COLOCAR UM COMANDO NO JS, ELES DEVEM SER CHAMADOS POR FUNÇÕES

document.addEventListener("DOMContentLoaded", function(){
    exibirBoasVindas()
})

// O 'DOMContentLoaded' garante que as funções q serão criadas só vão executar quando a página for 100% carregada, tb garante q o arquivo aq utilizado exista antes de iniciar o JS

function exibirBoasVindas(){

    const saudacao = document.querySelector("#boas-vindas");
    const hora = new Date().getHours();
    if (saudacao) {
        saudacao.textContent =
        hora < 12
          ? "Bom dia! Qual o seu pedido?"
            : "Boa tarde! Confira nosso cardápio.";
    }
}
