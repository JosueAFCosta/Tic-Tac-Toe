const root = document.querySelector(':root')
const main = document.querySelector('main')
const input1 = document.getElementById('player1')
const input2 = document.getElementById('player2')
const startBtn = document.getElementById('startBtn')
const playerName = document.getElementById('playerName')
const h3 = document.querySelector('h3')
const turn = document.querySelector('div[class="turn"]')
const playAgainBtn = document.createElement('button')
const br = document.createElement('br')
let playerWinner = false
let player1 = ''
let player2 = ''

playAgainBtn.classList.add('playAgain')
playAgainBtn.innerText = 'Jogar Novamente?'
playAgainBtn.addEventListener('click', function() {
    location.reload()
})

startBtn.addEventListener('click', function (ev) {
    ev.preventDefault()

    const fstPlayer = Math.floor(Math.random() * 2) + 1

    if (input1.value === '' || input2.value === '') {
        alert('Insira 2 jogadores')
        return
    }

    player1 = input1.value
    player2 = input2.value
    input1.disabled = true
    input2.disabled = true
    startBtn.disabled = true
    input1.value = ''
    input2.value = ''

    document.querySelectorAll('.tttBtn').forEach(function(button) {
        button.disabled = false
    })

    if (fstPlayer === 1) {
        playerName.innerText = player1
    } else {
        playerName.innerText = player2
    }

    main.removeChild(document.querySelector('header'))
    main.removeChild(document.querySelector('hr'))

    document.querySelectorAll('.tttBtn').forEach(function(tttBtn) {
        tttBtn.addEventListener('click', pressedBtn)})
})

function pressedBtn (ev) {
    const gameButton = ev.currentTarget
    gameButton.disabled = true
    if (playerName.innerText === player1) {
        gameButton.innerText = 'X'
        gameButton.classList.add('x')
        gameButton.dataset.value = 'x'
        playerName.innerText = player2
    } else {
        gameButton.innerText = 'O'
        gameButton.classList.add('o')
        gameButton.dataset.value = 'o'
        playerName.innerText = player1
    }

    gameEnd()

}

function gameEnd () {
    const tl = document.getElementById('tl')
    const tm = document.getElementById('tm')
    const tr = document.getElementById('tr')
    const ml = document.getElementById('ml')
    const mm = document.getElementById('mm')
    const mr = document.getElementById('mr')
    const bl = document.getElementById('bl')
    const bm = document.getElementById('bm')
    const br = document.getElementById('br')

    if (tl.dataset.value === mm.dataset.value && tl.dataset.value === br.dataset.value) { //Diagonal esquerda para direita
        tl.classList.add('winner')
        mm.classList.add('winner')
        br.classList.add('winner')
        playerWinner = true
        winner(tl.dataset.value)
    }
    if (tr.dataset.value === mm.dataset.value && tr.dataset.value === bl.dataset.value) { //Diagonal direita para esquerda
        tr.classList.add('winner')
        mm.classList.add('winner')
        bl.classList.add('winner')
        playerWinner = true
        winner(tr.dataset.value)
    }
    if (tl.dataset.value === tm.dataset.value && tl.dataset.value === tr.dataset.value) { //Lado de cima
        tl.classList.add('winner')
        tm.classList.add('winner')
        tr.classList.add('winner')
        playerWinner = true
        winner(tl.dataset.value)
    }
    if (bl.dataset.value === bm.dataset.value && bl.dataset.value === br.dataset.value) { //Lado de baixo
        bl.classList.add('winner')
        bm.classList.add('winner')
        br.classList.add('winner')
        playerWinner = true
        winner(bl.dataset.value)
    }
    if (tl.dataset.value === ml.dataset.value && tl.dataset.value === bl.dataset.value) { //Lado esquerdo
        tl.classList.add('winner')
        ml.classList.add('winner')
        bl.classList.add('winner')
        playerWinner = true
        winner(tl.dataset.value)
    }
    if (tr.dataset.value === mr.dataset.value && tr.dataset.value === br.dataset.value) { //Lado direito
        tr.classList.add('winner')
        mr.classList.add('winner')
        br.classList.add('winner')
        playerWinner = true
        winner(tr.dataset.value)
    }
    if (ml.dataset.value === mm.dataset.value && ml.dataset.value === mr.dataset.value) { //Linha do meio
        ml.classList.add('winner')
        mm.classList.add('winner')
        mr.classList.add('winner')
        playerWinner = true
        winner(ml.dataset.value)
    }
    if (tm.dataset.value === mm.dataset.value && tm.dataset.value === bm.dataset.value) { //Linha do meio
        tm.classList.add('winner')
        mm.classList.add('winner')
        bm.classList.add('winner')
        playerWinner = true
        winner(tm.dataset.value)
    }
    if (tl.disabled === true && tm.disabled === true && tr.disabled === true && ml.disabled === true && mm.disabled === true && mr.disabled === true && bl.disabled === true && bm.disabled === true && br.disabled === true && playerWinner === false) {
        playerName.innerText = ''
        h3.innerText = 'O jogo Empatou!'
        endGame()
    }
}

function endGame () {
    turn.appendChild(br)
    turn.appendChild(playAgainBtn)
}

function winner(winnerTeam) {
    if (winnerTeam === 'x') {
        playerName.innerText = ''
        h3.innerText = 'O vencedor é: ' + player1
    } else {
        playerName.innerText = ''
        h3.innerText = 'O vencedor é: ' + player2
    }
    document.querySelectorAll('.tttBtn').forEach(function(button) {
        button.disabled = true
    })
    
    endGame()

}

document.getElementById('themeSwitcher').addEventListener('click', function() {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color',  '#ebebce')
        root.style.setProperty('--font-color', '#313131')
        root.style.setProperty('--button-color', '#313131')
        root.style.setProperty('--green-color', '#0f890f')

        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#313131')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--button-color', '#ebebce')
        root.style.setProperty('--green-color', '#00ff00')

        main.dataset.theme = 'dark'
    }
})