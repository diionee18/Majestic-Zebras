import wordList from "./word-list.json" assert { type: "json" };
console.log(wordList);

const poängBtn = document.querySelector(".se-poäng-knapp");
const andraFönstret = document.querySelector(".visa-efter-start");
const inputNamn = document.querySelector("#spelarens-namn");
const spelaBtn = document.querySelector(".börja-spelet-knapp");
const förstaFönstret = document.querySelector(".upp-efter-klick");
const börjaOmBtn = document.querySelector('.reset-btn')

börjaOmBtn.style.display ='none'

const parts = {
  partEtt: document.querySelector(".part1"),
  partTvå: document.querySelector(".part2"),
  partTre: document.querySelector(".part3"),
  partFyra: document.querySelector(".part4"),
  partFem: document.querySelector(".part5"),
};

// parts.partEtt.style.display = 'none'
// parts.partTvå.style.display = 'none'
// parts.partTre.style.display = 'none'
// parts.partFyra.style.display = 'none'
// parts.partFem.style.display = 'none'

förstaFönstret.style.display = "";
andraFönstret.style.display = "none";

spelaBtn.addEventListener("click", () => {
  localStorage.setItem("inputValue", inputNamn.value);
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

let svar = "";
let maxFel = 6;
let misstag = 0;
let gissat = [];
let ordStatus = null;

function randomOrd() {
  svar = wordList[Math.floor(Math.random() * wordList.length)]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function generateKnapp() {
  "abcdefghijklmnopqrstuvwxyzåäö".split("").forEach((bokstav) => {

    let button = document.createElement("button");
    button.className = "btn btn-1g btn-primary m-2";
    button.setAttribute("id", bokstav);
    button.innerHTML = bokstav;
    // <button class="btn btn-1g btn-primary m-2" id="b">b</button>

    button.addEventListener("click", (e) => {
      behandlaGuess(e.currentTarget.innerHTML);

    });
    
    window.addEventListener("keydown", (e) => {
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

    document.querySelector(".input-container-rätt").appendChild(button);
  });
}

function behandlaGuess(valdBokstav) {
  gissat.indexOf(valdBokstav) === -1 ? gissat.push(valdBokstav) : null;
  document.getElementById(valdBokstav).setAttribute("disabled", true);

  

  if (svar.indexOf(valdBokstav) >= 0) {
    gissatOrd();
    CheckIfGameWon();
  } else if (svar.indexOf(valdBokstav) === -1){
    misstag++;
    uppdateraMisstag();
    CheckIfGameLost();
    uppdateraFigur();
  }
}

function uppdateraFigur(){
  document.getElementById('Hänga-gubbebild').src = './bilder/' + misstag + '.jpg' ;
}

function CheckIfGameWon(){
  if(ordStatus === svar){
    börjaOmBtn.style.display= 'block'
    document.querySelector('.input-container-rätt').innerHTML = 'Hurra!! Du vann!'
    document.querySelector('.reset-btn').innerHTML = 'Spela igen';
  }
}


function CheckIfGameLost(){
  if(misstag === maxFel){
    document.querySelector('.input-container-rätt').innerHTML = 'Du har förlorat, spela igen?' 
    börjaOmBtn.style.display= 'block'
  }
}


function gissatOrd() {
  ordStatus = svar
    .split("")
    .map((bokstav) => (gissat.indexOf(bokstav) >= 0 ? bokstav : " _ "))
    .join("");
  document.querySelector(".ord-spotlight").innerHTML = ordStatus;
}

function uppdateraMisstag(){
  document.getElementById('misstag').innerHTML = misstag
}

function reset(){
  misstag = 0;
  gissat = [];
  document.querySelector

}

document.querySelector(".max-fel").textContent = maxFel;

generateKnapp();
gissatOrd();

// const secretWord = "Ali";
// const ul = document.querySelector(".ul-bokstäver-rätt");
// const mistakes = document.querySelector(".ul-fel-bokstäver");
// let remainingLetters = secretWord.length;

// for (const letter of secretWord) {
//   const li = document.createElement("li");
//   li.textContent = "_";
//   ul.appendChild(li);
// }

// document.addEventListener("keypress", (event) => {
//   const letter = event.key;
//   let letterFound = false;

//   for (let i = 0; i < secretWord.length; i++) {
//     if (secretWord[i] === letter) {
//       const li = ul.children[i];
//       li.textContent = letter;
//       letterFound = true;
//       remainingLetters--;

//     }
//   }

//   if (!letterFound) {
//     const mistake = document.createElement("div");
//     mistake.textContent = letter;
//     mistakes.appendChild(mistake);
//   }

//   if (remainingLetters === 0) {
//     alert("Congratulations! You have won the game.");
//   }
// });
