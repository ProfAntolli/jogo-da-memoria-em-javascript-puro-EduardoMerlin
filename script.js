const cards = document.querySelectorAll('.card');
let cardVirado = false;
let jogoBloqueado = false;
let primeiraCarta, segundaCarta;

//função virar carta
function virarCarta() {
    if (jogoBloqueado) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (!cardVirado) {
        cardVirado = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    cardVirado = false;

    verSeCombina();
}

//verifica se cartas sao iguais
function verSeCombina() {
    if (primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desabilitarCartas();
        return;
    }

    desvirarCarta();
}

//desabilita cartas
function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetBoard();
}

//desvira cartas
function desvirarCarta() {
    jogoBloqueado = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//reseta tabuleiro
function resetBoard() {
    [cardVirado, jogoBloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//embaralha cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//adiciona evento clique carta
cards.forEach((card) => {
    card.addEventListener('click', virarCarta);
});