var tabOrig;//variável que armazena todos os O´s e X´s
const jogador = 'X';
const cpu = 'O';
//todas as possibilidades de vitória
const possibilidades = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const celulas = document.querySelectorAll('.cell');
iniciarJogo();

//função para iniciar jogo
function iniciarJogo() {
    document.querySelector('.fimdejogo').style.display = 'none';
    tabOrig = Array.from(Array(9).keys());
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].innerText = '';
        celulas[i].style.removeProperty('background-color');
        celulas[i].addEventListener('click', showClick, false);
    }
}
//define a funcionalidade do addEventListener
function showClick(square) {
    if (typeof tabOrig[square.target.id] == 'number') {
        turno(square.target.id, jogador);
        if (!checarEmpate()) turno(melhorPonto(), cpu);
    }
}
//define a funcionalidade da função anterior
function turno(squareID, player) {
    tabOrig[squareID] = player;
    document.getElementById(squareID).innerText = player;
    let jogoVencido = checarVencedor(tabOrig, player);
    if (jogoVencido) fimdeJogo(jogoVencido);
}

//função para checar vencedor
function checarVencedor(tabuleiro, player) {
    let jogadas = tabuleiro.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let jogoVencido = null;
    for (let [index, win] of possibilidades.entries()) {
        if (win.every(elem => jogadas.indexOf(elem) > -1)) {
            jogoVencido = {index: index, player: player};
            break;
        }
    }
    return jogoVencido;

}
//função para encerrar o jogo
function fimdeJogo(jogoVencido) {
    for (let index of possibilidades[jogoVencido.index]) {
            document.getElementById(index).style.backgroundColor =
                jogoVencido.player == jogador ? 'blue' : 'red';
    }
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].removeEventListener('click', showClick, false);
    }
    declararVencedor(jogoVencido.player == jogador ? 'Você Venceu!' : 'Você Perdeu!')
}

function declararVencedor(quem) {
    document.querySelector('.fimdejogo').style.display = 'block';
    document.querySelector('.fimdejogo .text').innerText = quem;
}

function camposVazios() {
    return tabOrig.filter(s => typeof s == 'number');
}

function melhorPonto() {
    return camposVazios()[0];
}

function checarEmpate() {
    if (camposVazios().length == 0) {
        for (var i = 0; i < celulas.length; i++) {
            celulas[i].style.backgroundColor = 'green';
            celulas[i].removeEventListener('click', showClick, false);
        }
        declararVencedor('Empate!')
        return true;
    }
    return false;
}