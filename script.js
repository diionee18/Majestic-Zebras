import wordList from "./word-list.json" assert { type: "json" };
console.log(wordList);

const poängBtn = document.querySelector(".se-poäng-knapp");
const andraFönstret = document.querySelector(".visa-efter-start");
const spelaBtn = document.querySelector(".börja-spelet-knapp");
const inputNamn = document.querySelector("#spelarens-namn");
const förstaFönstret = document.querySelector(".upp-efter-klick");
const börjaOmBtn = document.querySelector(".reset-btn");

börjaOmBtn.style.display = "none";
förstaFönstret.style.display = "";
andraFönstret.style.display = "none";

spelaBtn.addEventListener("click", () => {
  randomOrd();
});

function toggleSections() {
  if (förstaFönstret.style.display === "block") {
    andraFönstret.style.display = "none";
  } else {
    förstaFönstret.style.display = "none";
    andraFönstret.style.display = "block";
  }
}
spelaBtn.addEventListener("click", toggleSections);

const maxFel = 6;
let svar = "";
let misstag = 0;
let gissat = [];
let ordStatus = null;

function randomOrd() {
  svar = wordList[Math.floor(Math.random() * wordList.length)]
  ordStatus = "";
  for (let i = 0; svar.length > i; i++) {
    ordStatus = " _ " + ordStatus;
    document.querySelector(".ord-spotlight").innerHTML = ordStatus;
  }
}

let gameState = "playing";

window.addEventListener("keydown", (e) => {
  if (gameState != "playing") {
    return;
  }

  if (!svar) {
    return;
  }

  if (e.repeat) {
    return;
  }

  if ("abcdefghijklmnopqrstuvwxyzåäö".includes(e.key.toLocaleLowerCase())) {
    behandlaGuess(e.key.toLocaleLowerCase());
  }
});

// Hantera inmatning.

function behandlaGuess(valdBokstav) {
  let redanGissadPå = false;
  if (gissat.indexOf(valdBokstav) === -1) {
    gissat.push(valdBokstav)
  } else {
    redanGissadPå = true;
  }

  let bokstavElement = document.getElementById(valdBokstav);
  if (bokstavElement) {
    bokstavElement.setAttribute("disabled", true);
  }

  if (svar.indexOf(valdBokstav) >= 0 && !redanGissadPå) {
    gissatOrd();
    CheckIfGameWon();
  } else if (svar.indexOf(valdBokstav) === -1 && !redanGissadPå) {
    misstag++;
    let misstagVärde = misstag;
    
    uppdateraMisstag();
    CheckIfGameLost();
    uppdateraFigur();
    let felBokstäver = document.querySelector(".fel-bokstäver");
    felBokstäver.innerHTML += ` ${valdBokstav} `;
  }
}


function sparaResultat(won) {
  const resultat = {
    name: inputNamn.value,
    misstag: misstag,
    won: won
  }

  let score = localStorage.getItem("score");
  if (score === null) {
    localStorage.setItem('score', JSON.stringify([resultat]))
  } else {
    score = JSON.parse(score);
    score.push(resultat);
    localStorage.setItem('score', JSON.stringify(score))
  }

}

function uppdateraFigur() {
  document.getElementById("Hänga-gubbebild").src =
    "./bilder/" + misstag + ".jpg";
}

function CheckIfGameWon() {
  if (ordStatus === svar) {
    börjaOmBtn.style.display = "block";
    document.querySelector(".input-container-rätt").innerHTML =
      "Hurra!! Du vann!";
    document.querySelector(".reset-btn").innerHTML = "Spela igen";
    gameState = "vunnit";
    sparaResultat(true)
    
  }
}

function CheckIfGameLost() {
  if (misstag === maxFel) {
    document.querySelector(".input-container-rätt").innerHTML =
      `Du har förlorat och det rätta ordet var: <br> "${svar}"`
    börjaOmBtn.style.display = "block";
    gameState = "förlorat";

    sparaResultat(false)
    
  }
}

function gissatOrd() {
  ordStatus = svar
    .split("")
    .map((bokstav) => (gissat.indexOf(bokstav) >= 0 ? bokstav : " _ "))
    .join("");
  document.querySelector(".ord-spotlight").innerHTML = ordStatus;
}

function uppdateraMisstag() {
  document.getElementById("misstag").innerHTML = misstag;
}

document.querySelector(".max-fel").textContent = maxFel;

// generateKnapp();
gissatOrd();

//Linns kod

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("#openOverlay");
  const closeBtn = document.querySelector("#closeOverlay");
  const overlay = document.querySelector(".overlay");
  const switchBtn = document.querySelector("#switchOrder");

  let isSortByDate = false;
  
  switchBtn.addEventListener("click", () => {
    isSortByDate = !isSortByDate;
    if (isSortByDate) {
      switchBtn.innerHTML = "Sortera efter poäng";
    } else {
      switchBtn.innerHTML = "Sortera efter datum";
    }
    openBtn.click();
  });

  openBtn.addEventListener("click", () => {
    overlay.style.display = "block";

    let score = localStorage.getItem("score");
    if (!score) {
      return;
    }

    score = JSON.parse(score);
    if (isSortByDate) {
      score = score.sort((p1, p2) => {
        return new Date(p2.date) - new Date(p1.date);
      });
    } else {
      score = score.sort((p1, p2) => {
        return p2.score - p1.score;
      });
  
      score = score.sort((p1, p2) => {
        return p1.misstag - p2.misstag;
      });
    }

    const parent = document.getElementById("ul-poänglista");
    Array.from(parent.getElementsByTagName('li')).forEach(el => {
      el.remove();
    });

    score.forEach((player) => {
      let li = document.createElement("li");
      let wonText = player.won ? "Vann" : "Förlorade";
      li.innerHTML = `<p>Spelare: ${player.name}</p> <p>Antal fel: ${player.misstag}</p> <p>${wonText}</p>`;
      li.className = 'li-lista'
      parent.appendChild(li);
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});
