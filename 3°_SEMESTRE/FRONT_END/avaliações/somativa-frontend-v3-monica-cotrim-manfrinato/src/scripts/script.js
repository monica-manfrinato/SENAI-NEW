//MISSÃO 1

const data = new Date()
const hora = data.getHours()
const saudacao = document.querySelector('#saudacao-voluntario')

saudacao.textContent = hora >= 12 && hora < 18 ? 'Plantão da tarde, Protetor!' : hora >= 18 && hora < 24 ? 'Plantão noturno, Protetor!' :'Plantão matinal, Protetor!'


//MISSÃO 2

const banner = document.querySelector('#banner-adocao')

banner.addEventListener("mouseover", ()=>{
    banner.classList.add('destaque-pet') 
})

banner.addEventListener("mouseout", ()=>{
    banner.classList.remove('destaque-pet') 
})


//MISSÃO 3

const idadePet = document.getElementById('idade-pet')
const idadeHumana = document.getElementById('idade-humana')

idadePet.addEventListener('input', ()=>{
    idadeHumana.textContent = Number(idadePet.value) * 7
})


//MISSÃO 4

btnCadastrar = document.querySelector('#btn-cadastrar')
listaAdocao = document.querySelector('#lista-adocao')
nomePet = document.querySelector('#nome-pet')

btnCadastrar.addEventListener("click", ()=> {
    if (nomePet.value == ""){
        listaAdocao.textContent == listaAdocao

    }
    else{
        listaAdocao.innerHTML += `<article class="card-adocao"><h3>🐾 ${nomePet.value}</h3></article>`
    }
})


//MISSÃO 5

btnLimpar = document.getElementById('btn-limpar')

btnLimpar.addEventListener("click", ()=> {
    listaAdocao.textContent = ''
    nomePet.value = ''

    idadePet.value = 0 
    idadeHumana.textContent = ''

})
