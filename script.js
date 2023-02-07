import wordList from "./word-list.json" assert { type: "json" };
console.log(wordList);

const poängBtn = document.querySelector(".se-poäng-knapp");
const andraFönstret = document.querySelector(".visa-efter-start");
const spelaBtn = document.querySelector(".börja-spelet-knapp");
const inputNamn = document.querySelector('#spelarens-namn')
const förstaFönstret = document.querySelector(".upp-efter-klick");
const börjaOmBtn = document.querySelector('.reset-btn')

börjaOmBtn.style.display ='none'
förstaFönstret.style.display = "";
andraFönstret.style.display = "none";


/*
function addPlayer(e) {
  e.preventDefault();

  let div = document.createElement('div');
  div.classList.add('poäng-box');

  let name = document.createElement('p');
  name.classList.add(vemSpelar.inputNamn.value)

  let guesses = document.createElement('p')
  guesses.classList.add(gissat.value)
  
  let Vannellerförlorade = document.createElement('p')
  Vannellerförlorade.classList.add(.value)

  div.append(name, guesses, Vannellerförlorade)

  name.value = '';
  guesses.value = '';
  Vannellerförlorade.value = '';


Spara namnet i rader
const sparatNamn = localStorage.getItem(LS_KEY) 
if( sparatNamn !== '' && sparatNamn !== null) {
  vemSpelar.inputNamn.value = sparatNamn

  let name = JSON.stringify(sparatNamn)
  console.log(JSON.stringify(name));
}*/


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
    let misstagVärde = misstag.value
    console.log(misstagVärde)
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

 

document.querySelector(".max-fel").textContent = maxFel;

generateKnapp();
gissatOrd();

const LS_KEY = 'hänga-gubbe'

const data = {name: inputvalue, misstag: }


function playerData () {
  

}


spelaBtn.addEventListener("click", () => {
  localStorage.setItem(LS_KEY, inputNamn.value);
  randomOrd(); 
  playerData();
})


localStorage.setItem("playerData", JSON.stringify({
  name: inputNamn.value,
  mistakes: misstag.value,
}));

const playerData = JSON.parse(localStorage.getItem("playerData"));
console.log(playerData.name);
console.log(playerData.mistakes);


// Spara inputNamn.value och antal misstag i localStorage
function saveDataToLocalStorage() {
  let inputName = document.getElementById("inputNamn").value;
  let mistakes = 0; // Antalet misstag som spelaren gör
  
  // Spara data i localStorage
  localStorage.setItem("inputName", inputName);
  localStorage.setItem("mistakes", mistakes);
}

// Hämta data från localStorage
function getDataFromLocalStorage() {
  let inputName = localStorage.getItem("inputName");
  let mistakes = localStorage.getItem("mistakes");
  
  console.log(inputName, mistakes);
}
let button = document.querySelector('button')
button.addEventListener('click', event => {
  console.log('Du klickade på knappen')
  console.log(event)
} )

document,addEventListener('DOMContentLoaded',() => {
const openBtn = document.querySelector('#openOverlay');
const closeBtn = document.querySelector('#closeOverlay');
const overlay = document.querySelector('.overlay');

openBtn.addEventListener('click', () => {
overlay.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
})
});
