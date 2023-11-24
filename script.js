const emojis = {
  A: "🌈",
  B: "🍎",
  C: "🐶",
  D: "🌻",
  E: "🚀",
  F: "🌟",
  G: "🍕",
  H: "🎈",
};

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
let timer;
let seconds = 0;

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

  // Vérifier si toutes les paires ont été trouvées
  if (matchedCards.length === cards.length) {
    showVictoryMessage(seconds); // Appel de la fonction avec le temps final
  }
}

// Update the game board
function updateBoard() {
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((card, index) => {
    card.innerHTML =
      flippedCards.includes(index) || matchedCards.includes(index)
        ? emojis[cards[index]]
        : "";
    card.classList.toggle("flipped", flippedCards.includes(index));
    card.classList.toggle("matched", matchedCards.includes(index));
  });
}

// Reset the game
function resetGame() {
  clearInterval(timer);
  seconds = 0;
  flippedCards = [];
  matchedCards = [];
  cards.sort(() => Math.random() - 0.5);
  updateBoard();

  // Masquer l'écran de victoire
  document.getElementById("victory-screen").style.display = "none";

  // Afficher l'écran de début
  document.getElementById("start-screen").style.display = "flex";

  // Masquer le container du jeu
  document.getElementById("game-container").style.display = "none";
}

// Ajouter le timer et le début du jeu
function startGame() {
  // Réinitialiser le jeu
  resetGame();

  // Masquer l'écran de début
  document.getElementById("start-screen").style.display = "none";

  // Afficher le container du jeu
  document.getElementById("game-container").style.display = "block";

  // Afficher le tableau de jeu
  document.getElementById("game-board").style.display = "grid";

  // Démarrer le timer
  startTimer();
}

// Ajouter la fonction du timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    document.getElementById("timer-value").textContent = seconds;
  }, 1000);
}

// Ajouter la fonction du message de victoire
function showVictoryMessage(timeInSeconds) {
  clearInterval(timer);

  // Rediriger vers la page de victoire après 2 secondes (2000 millisecondes)
  setTimeout(() => {
    window.location.href = `victory.html?time=${timeInSeconds}`;
  }, 2000);
}
