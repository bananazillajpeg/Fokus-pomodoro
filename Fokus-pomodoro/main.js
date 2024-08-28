const html = document.querySelector('html')
const timer = document.querySelector('#timer')
const image = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const startPauseBtn = document.querySelector('#start-pause')
const btns = document.querySelectorAll('.app__card-button')
const musicaInput = document.querySelector('#alternar-musica')
const musicaFoco = new Audio('./sons/luna-rise-part-one.mp3')
musicaFoco.loop = true
let tempoDecorridoEmSeg = 1500
let intervaloId = null
const somPause = new Audio('./sons/pause.mp3')
const somPlay = new Audio('./sons/play.wav')
const somOver = new Audio('./sons/beep.mp3')
const startPauseIcon = document.querySelector('.app__card-primary-button-icon')
const iniciarOuPausarBt = document.querySelector('#start-pause span')

musicaInput.addEventListener('click', () => {
    if (musicaFoco.paused) {
        musicaFoco.play()
    } else {
        musicaFoco.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSeg = 1500
    altContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSeg = 300
    altContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSeg = 900
    altContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function altContexto(contexto) {
    mostrarTempo()
    btns.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    image.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            title.innerHTML =
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`

            break;

        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSeg <= 0) {
        somOver.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)

        }
        zerar()
        return
    }
    tempoDecorridoEmSeg -= 1
    mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        somPause.play()
        return
    } else {
        intervaloId = setInterval(contagemRegressiva, 1000)
        somPlay.play()
    }
    iniciarOuPausarBt.textContent = "Pausar"
    startPauseIcon.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    startPauseIcon.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSeg * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
