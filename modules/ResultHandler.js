export function CheckIfGameWon() {
  if (ordStatus === svar) {
    börjaOmBtn.style.display = "block";
    document.querySelector(".input-container-rätt").innerHTML =
      "Hurra!! Du vann!";
    document.querySelector(".reset-btn").innerHTML = "Spela igen";
    gameState = "vunnit";
    sparaResultat(true)
    
  }
}

export function CheckIfGameLost() {
  if (misstag === maxFel) {
    document.querySelector(".input-container-rätt").innerHTML =
      `Du har förlorat och det rätta ordet var: <br> "${svar}"`
    börjaOmBtn.style.display = "block";
    gameState = "förlorat";

    sparaResultat(false)
    
  }
}


export function sparaResultat(won) {
  const resultat = {
    name: inputNamn.value,
    misstag: misstag,
    won: won
  }
}
