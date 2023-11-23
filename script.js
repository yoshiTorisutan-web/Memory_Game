const cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

// Create the game board
const gameBoard = document.getElementById("game-board");
cards.forEach((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.index = index;
  cardElement.addEventListener("click", () => flipCard(index));
  gameBoard.appendChild(cardElement);
});

// Flip a card
function flipCard(index) {
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(index) &&
    !matchedCards.includes(index)
  ) {
    flippedCards.push(index);
    updateBoard();
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Check if the flipped cards are a match
function checkMatch() {
  const [index1, index2] = flippedCards;
  if (cards[index1] === cards[index2]) {
    matchedCards.push(index1, index2);
  }
  flippedCards = [];
  updateBoard();

  if (matchedCards.length === cards.length) {
    alert("Félicitations ! Vous avez trouvé toutes les paires.");
    resetGame();
  }
}

// Update the game board
function updateBoard() {
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((card, index) => {
    card.textContent =
      flippedCards.includes(index) || matchedCards.includes(index)
        ? cards[index]
        : "";
    card.classList.toggle("flipped", flippedCards.includes(index));
    card.classList.toggle("matched", matchedCards.includes(index));
  });
}

// Reset the game
function resetGame() {
  flippedCards = [];
  matchedCards = [];
  cards.sort(() => Math.random() - 0.5);
  updateBoard();
}
