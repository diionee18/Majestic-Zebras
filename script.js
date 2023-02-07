import wordList from "./word-list.json" assert { type: "json" };
console.log(wordList);

const poängBtn = document.querySelector(".se-poäng-knapp");
const andraFönstret = document.querySelector(".visa-efter-start");
const inputNamn = document.querySelector("#spelarens-namn");
const spelaBtn = document.querySelector(".börja-spelet-knapp");
const förstaFönstret = document.querySelector(".upp-efter-klick");
const börjaOmBtn = document.querySelector('.reset-btn')


börjaOmBtn.style.display ='none'
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



// function generateKnapp() {
//   "abcdefghijklmnopqrstuvwxyzåäö".split("").forEach((bokstav) => {

//     let button = document.createElement("button");
//     button.className = "btn btn-1g btn-primary m-2";
//     button.setAttribute("id", bokstav);
//     button.innerHTML = bokstav;
//     button.style.display = 'none'
   

//     button.addEventListener("click", (e) => {
//       behandlaGuess(e.currentTarget.innerHTML);

//     });
  
//     document.querySelector(".input-container-rätt").appendChild(button);
//   });
// }


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

let incorrectLetters = [];

function displayIncorrectLetters() {
  let incorrectLettersString = incorrectLetters.join(", ");
  document.getElementById("incorrect-letters").innerHTML = "Felstavade bokstäver: " + incorrectLettersString;
}
