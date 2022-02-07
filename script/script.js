const difficulty =        document.querySelector("#difficultySelector")
const restartGameButton = document.querySelector("#restartGameButton")
const gameInterface =     document.querySelector('#gameInterface')
const showDifficulty =    document.querySelector("#actualDifficulty")


// Capitura a mudança de dificuldade do input
difficulty.addEventListener("change", getDifficulty)

// Registra a dificultade

let gameDifficulty = 0
function getDifficulty () {
    // Altera a variavel global de dificuldade
    gameDifficulty = difficulty.value
    // Mostrar a dificuldade em tela
    showDifficulty.value = gameDifficulty
    // Resetar as torres para quando se altera a dificuldade no meio do game
    tower1.innerHTML = ""
    tower2.innerHTML = ""
    tower3.innerHTML = ""
    // 
    creatDisco(difficulty.value)
    
}

// função para criar as torres, class e id, e pendurar no gameInterface
function creatTower (quantidade) {
    for (let i = 1; i <= quantidade; i++) {
        let tower = document.createElement("section")

        tower.classList.add("towerBase")
        tower.id = "tower" + i

        gameInterface.appendChild(tower)
    }
}
creatTower(3)

const tower1 = document.querySelector("section#tower1") // Me informaram que pode ser descartado
const tower2 = document.querySelector("section#tower2") // Me informaram que pode ser descartado
const tower3 = document.querySelector("section#tower3") // Me informaram que pode ser descartado

//função para criar os discos, class e id, e pendurar na torre
function creatDisco (gameDifficulty) {

    for (let i = 1; i <= gameDifficulty; i++) {
        let disco = document.createElement("div")

        disco.id = "disco" + i
        disco.classList.add("disco")

        tower1.appendChild(disco)
    }
    
}
creatDisco(getDifficulty())

// Botão de resetar o game a qualquer momento, e se jogo tiver acabado, desfazer condição de vitoria
restartGameButton.addEventListener("click", restartGame)
function restartGame (restartGameButton) {
    // reseta torres
    tower1.innerHTML = ""
    tower2.innerHTML = ""
    tower3.innerHTML = ""
    // recria os dicos de acordo com a dificuldade
    creatDisco(gameDifficulty)
    // reseta e mostra o reset de movimentos
    moves = 0
    movements.value = moves
    // reseta o tipo de jogada
    tipoDeJogada = "selecionar"
    // se estiver na tela de vitoria, reseta a tela
    if (gameInterface.style.display === "none") {
        desfazerVitoria()
    }
}

// Receber o clique, armazenar o clique, tranferir o clique
const movements = document.querySelector("#moveCounter")
const tower = document.querySelector(".towerBase")
tower1.addEventListener("click", getFirstMovAndAplySecondMOve)
tower2.addEventListener("click", getFirstMovAndAplySecondMOve)
tower3.addEventListener("click", getFirstMovAndAplySecondMOve)

// Variaveis de contador de movimentos, qual disco está selecionado, qual o modo de jogo
let moves = 0
let discoSelecionado = null
let tipoDeJogada = "selecionar"

// Função que interpreta qual torre está sendo clicada, 
function getFirstMovAndAplySecondMOve (event) {
    let tamanhoDiscoSelecionado
    let tamanhoDiscoTorre
    
    const torreClicada = event.currentTarget
    if (tipoDeJogada === "selecionar") { // SE modo de jogo DEFAULT (Selecionar), seleciona o Disco da torre clicada, altera modo de jogo para MOVER, move o disco para cima
        discoSelecionado = torreClicada.lastChild
        tipoDeJogada = "mover"
        discoSelecionado.style.marginBottom = "20px"
        tamanhoDiscoSelecionado = discoSelecionado.clientWidth

    } else if (tipoDeJogada === "mover") {
        if (torreClicada.childElementCount > 0) { // SE houver childElements atualiza os valores de:
            tamanhoDiscoTorre = torreClicada.lastChild.clientWidth 
            tamanhoDiscoSelecionado = discoSelecionado.clientWidth
        }
        if (tamanhoDiscoSelecionado <= tamanhoDiscoTorre || tamanhoDiscoTorre === undefined) { //É possivel colocar o disco SE, não houver disco OU o disco for menor
            torreClicada.appendChild(discoSelecionado)
            tipoDeJogada = "selecionar"
            moves ++
            movements.value = moves
            discoSelecionado.style.marginBottom = "0px"
            if (tower2.childElementCount == gameDifficulty || tower3.childElementCount == gameDifficulty ){ // Condição de vitoria e aplicando função
                condicaoDeVitoria()
            } 
         } else { //Alerta de jogada Invalida
             alert("Jogada Invalida, tente novamente!")

         }
         }
         // Verificação de tamanho de discos
         console.log(tamanhoDiscoSelecionado)
         console.log(tamanhoDiscoTorre)
}

// Alteração de tela para mensagem de Vitória
const victory = document.querySelector("#victory")

// Função para fazer a mensagem aparecer
function condicaoDeVitoria () {
    gameInterface.style.display = "none"
    victory.style.display =       "block"
}

// Função para fazer mensagem desaparecer
function desfazerVitoria () {
    gameInterface.style.display = "flex"
    victory.style.display =       "none"
}