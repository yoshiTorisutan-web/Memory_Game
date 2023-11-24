// Ajouter des actions spécifiques à la page de victoire ici
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const timeInSeconds = urlParams.get("time");

  if (timeInSeconds !== null) {
    const finalTimeSpan = document.getElementById("final-time");
    finalTimeSpan.textContent = timeInSeconds;
  } else {
    // Gérer le cas où le paramètre de temps n'est pas présent
    console.error("Le paramètre de temps n'est pas présent dans l'URL.");
  }
});

function restartGame() {
  // Rediriger vers la page principale du jeu
  window.location.href = "index.html";
}
