document.getElementById("cadastro").addEventListener("submit", async function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form); // pega todos os campos + arquivo

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
