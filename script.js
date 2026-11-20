const cards = document.querySelectorAll(".card");

const movesDisplay = document.getElementById("moves");

const symbols = ["🐶", "🐱", "🐸", "🐻", "🐸", "🐱", "🐻", "🐶"];
symbols.sort(()=> Math.random() - 0.5);

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

function flipCard(card, index) {
    if (lockBoard){
        return;
    }

    if (card.classList.contains("flipped")) {
        return;
    }
    if (card.classList.contains("matched")){
        return;     
    }

    card.classList.add("flipped");
    card.textContent = symbols[index];
    flippedCards.push({
        card: card,
        symbol: symbols[index]
    });
    if (flippedCards.length === 2){
        moves++;
        movesDisplay.textContent = "Moves:" + moves;
        checkMatch();
    }
    }

function checkMatch() {
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    if (firstCard.symbol === secondCard.symbol) {
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

        matchedPairs++;
        if (matchedPairs === 4){
            document.getElementById("win-message").style.display = "flex";
        }
        flippedCards = [];
    }
    else{
        lockBoard = true;
        setTimeout(() => {
            firstCard.card.classList.remove("flipped");
            secondCard.card.classList.remove("flipped");

            firstCard.card.textContent = "?";
            secondCard.card.textContent = "?";

            flippedCards = [];
            lockBoard = false;

        }, 1000);
    }
}
    cards.forEach((card, index) => {
    card.addEventListener("click", function() {
        flipCard(card, index);
    });
});

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click",function(){
    location.reload();
});