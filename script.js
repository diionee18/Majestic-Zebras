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



spelaBtn.addEventListener("click", () => {
  localStorage.setItem("playerData", JSON.stringify({
  name: inputNamn.value,

}));
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
  ordStatus= ''
  for (let i= 0; svar.length > i; i++){
      ordStatus = ' _ ' + ordStatus
      document.querySelector(".ord-spotlight").innerHTML = ordStatus;

    }

}


  window.addEventListener("keydown", (e) => { 

    if (misstag === maxFel ){
      this.removeEventListener("keydown", false);
    }else if (ordStatus === svar){
      this.removeEventListener("keydown", false);
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
  



  


  function behandlaGuess(valdBokstav) {
  if (gissat.includes(valdBokstav)){
    console.log('behandlaguess2', gissat, valdBokstav)
    return;
  }


  gissat.indexOf(valdBokstav) === -1 ? gissat.push(valdBokstav) : null;
  let bokstavElement = document.getElementById(valdBokstav)
  if (bokstavElement){

    bokstavElement.setAttribute("disabled", true);

  }
  
  

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

// generateKnapp();
gissatOrd();

const data = {namn: inputNamn.value, }

function playerData() {
  
}


//Linns kod
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

//Alis kod 
let incorrectLetters = [];

function displayIncorrectLetters() {
  let incorrectLettersString = incorrectLetters.join(", ");
  document.getElementById("incorrect-letters").innerHTML = "Felstavade bokstäver: " + incorrectLettersString;
}

/*  Detta var som AI sa till mig i när jag frågade: 
Kan du hjälpa mig att skapa en varibel eller en funktion för att spara antal misstag i localstorage.  

SVARET JAG fick: 
Ja, jag kan hjälpa dig. Här är en enkel exempelkod i JavaScript för att spara antalet misstag i localstorage:
Denna kod definierar en global variabel mistakes och två funktioner, saveMistakes och loadMistakes. saveMistakes funktionen sparar antalet misstag i localstorage med nyckeln "mistakes", medan loadMistakes funktionen läser antalet misstag från localstorage och tilldelar det till variabeln mistakes.

//SJÄLVA FUNKTIONEN
function saveMistakes() {
  localStorage.setItem("misstag", misstag);
}

function loadMistakes() {
  misstag = parseInt(localStorage.getItem("misstag")) || 0;
}

loadMistakes();

// exempel på användning:
misstag += 1;
saveMistakes();*/

//Jag kollade och fattar inte hur jag ska få detta att funka. //ANSO