// ===== PERFIL =====
const inputQtd = document.getElementById('inputQtd')
const precoTexto = document.getElementById('precoTexto')
if (inputQtd && precoTexto){
  inputQtd.addEventListener("input", () =>{
    const precoUnitario = 45.0
    const total = Number(inputQtd.value) * precoUnitario
    precoTexto.textContent = 'R$' + total.toFixed(2)
    precoTexto.style.color = total > 150 ? "#FFC07F" : "#F15156"
  })
}

// ===== EVENT TARGET GLOBAL =====
document.addEventListener('click', (event) =>{
  const clicado = event.target
  console.log("Clicou em:", clicado)
})

// ===== EVENT TARGET SEÇÃO =====
const massas = document.querySelector('#secao_massas')
massas.addEventListener('click', (event) =>{
  const clicado = event.target
  if (clicado.classList.contains('bt_pedido')){
    console.log("Clique em massas!")
  }
})

// ===== BOTÕES INDIVIDUAIS =====
const botoesPedido = document.querySelectorAll('.bt_pedido')

botoesPedido.forEach((botao) => {
  botao.addEventListener("click", () =>{
    botao.textContent = "👌 Pedido enviado"
    botao.style.backgroundColor = "red"
    botao.disabled = true
  })
})

// ===== CONTADOR =====
const contador = document.getElementById('contador')
const botaoCurtir = document.getElementById('btn-curtir')
let curtidas = 0

botaoCurtir.addEventListener("click", () =>{
  curtidas++
  contador.textContent = curtidas
})

// ===== INPUT PREVIEW =====
const campoTexto = document.getElementById('campo-texto')
const preview = document.getElementById('preview-texto')

campoTexto.addEventListener('input', () =>{
  preview.textContent = `Digitando: ${campoTexto.value}`
})

// ===== MOUSE =====
const caixaCor = document.getElementById('caixa-cor')

caixaCor.addEventListener("mouseover", ()=> {
  caixaCor.style.backgroundColor = '#7f0a1c'
})

caixaCor.addEventListener("mouseout", ()=> {
  caixaCor.style.backgroundColor = '#95a5a6'
})

// ===== RESET =====
const botaoReset = document.getElementById('btn-reset')

botaoReset.addEventListener("click", ()=> {
  contador.textContent = 0
  curtidas = 0
  campoTexto.value = ''
  preview.textContent = 'Digitando:'
  inputQtd.value = ''
  precoTexto.textContent = 'R$0.00'
  inputTeclado.value = ''
  logTeclado.textContent = 'Eventos de teclado aparecerão aqui.'
  inputForm.value = ''
  logForm.textContent = 'Eventos de form aparecerão aqui.'
  logMouse.textContent = 'Eventos de mouse aparecerão aqui.'
  logDrag.textContent = 'Eventos de drag aparecerão aqui.'
  // Reabilitar botões desabilitados
  botoesPedido.forEach((botao, index) => {
    const textos = ['Pedir Macarrão', 'Pedir Lasanha']
    botao.textContent = textos[index] || 'Pedir'
    botao.style.backgroundColor = ''
    botao.disabled = false
  })
})

// ===== WINDOW =====
window.addEventListener("load", ()=> console.log("Página carregada"))
window.addEventListener("resize", ()=> console.log("Resize"))
window.addEventListener("scroll", ()=> console.log("Scroll"))

// ===== TECLADO =====
const inputTeclado = document.getElementById('input-teclado')
const logTeclado = document.getElementById('log-teclado')

inputTeclado.addEventListener('keydown', (event) => {
  logTeclado.textContent = `Tecla pressionada: ${event.key}`
})

inputTeclado.addEventListener('keyup', (event) => {
  logTeclado.textContent = `Tecla solta: ${event.key}`
})

// ===== FORMULÁRIO =====
const inputForm = document.getElementById('input-form')
const logForm = document.getElementById('log-form')

inputForm.addEventListener('change', () => {
  logForm.textContent = `Valor mudou: ${inputForm.value}`
})

inputForm.addEventListener('focus', () => {
  logForm.textContent = 'Foco no input'
})

inputForm.addEventListener('blur', () => {
  logForm.textContent = 'Perdeu foco'
})

// ===== MOUSE EXTRA =====
const caixaDblclick = document.getElementById('caixa-dblclick')
const logMouse = document.getElementById('log-mouse')

caixaDblclick.addEventListener('dblclick', () => {
  logMouse.textContent = 'Clique duplo!'
  caixaDblclick.style.backgroundColor = '#722f37'
  setTimeout(() => caixaDblclick.style.backgroundColor = '#95a5a6', 500)
})

document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  logMouse.textContent = 'Menu de contexto bloqueado'
})

document.addEventListener('wheel', (event) => {
  logMouse.textContent = `Rolagem: ${event.deltaY > 0 ? 'baixo' : 'cima'}`
})

// ===== DRAG AND DROP =====
const dragItem = document.getElementById('drag-item')
const dropZone = document.getElementById('drop-zone')
const logDrag = document.getElementById('log-drag')

dragItem.addEventListener('dragstart', () => {
  logDrag.textContent = 'Arrastando item...'
})

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropZone.classList.add('drag-over')
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over')
})

dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('drag-over')
  logDrag.textContent = 'Item solto na zona!'
  dropZone.appendChild(dragItem)
})

// ===== OUTROS EVENTOS DE JANELA =====
document.addEventListener('DOMContentLoaded', () => console.log('DOM carregado'))

window.addEventListener('beforeunload', (event) => {
  event.returnValue = 'Tem certeza que quer sair?'
})

document.addEventListener('visibilitychange', () => {
  console.log(document.hidden ? 'Aba invisível' : 'Aba visível')
})