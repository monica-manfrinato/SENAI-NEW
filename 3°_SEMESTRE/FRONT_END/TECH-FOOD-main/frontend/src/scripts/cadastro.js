document.getElementById("cadastro").addEventListener("submit", async function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form); // pega todos os campos + arquivo


  // ==========================================
  // VALIDAÇÕES NO FRONT-END
  // ==========================================
  
  // Pegando os valores por meio dos "names" do seu HTML
  const nome = formData.get("nome"); 
  const descricao = formData.get("descricao");
  const preco = formData.get("preco");
  const categoria = formData.get("categoria");
  const disponivel = formData.get("disponivel");
  const imagem = formData.get("imagem");

  // 1. Valida o Nome
  if (!nome || nome.trim() === "") {
    alert("Por favor, preencha o nome do prato.");
    return;
  }

  // 2. Valida a Descrição
  if (!descricao || descricao.trim() === "") {
    alert("Por favor, preencha a descrição.");
    return;
  }

  // 3. Valida o Preço (maior que zero)
  if (!preco || isNaN(preco) || Number(preco) <= 0) {
    alert("Por favor, insira um preço válido maior que zero.");
    return;
  }

  //4. Valida se uma categoria foi selecionada (não deixa ficar no 'Selecione')
  if (!categoria || categoria === "") {
    alert("Por favor, selecione uma categoria.");
    return;
  }

  // 5. Valida os botões de disponibilidade (Sim ou Não)
  if (!disponivel) {
    alert("Por favor, informe se o prato está disponível para venda imediata.");
    return;
  }

  // 6. Valida a Imagem
  if (!imagem || imagem.size === 0) {
    alert("Por favor, selecione uma foto para o prato.");
    return;
  }


  try {
    const response = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      body: formData // envia como multipart/form-data
    });

    const resultado = await response.json();

    if (response.ok) {
      alert("Prato cadastrado com sucesso!");
      form.reset();
    } else {
      alert("Erro ao cadastrar prato: " + (resultado.mensagem || ""));
    }
  } catch (error) {
    alert("Falha na conexão com a API.");
    console.error(error);
  }
});
