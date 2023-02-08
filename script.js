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
  randomOrd();
  dispData();
  // saveResult();
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


let gameState = 'playing'


  window.addEventListener("keydown", (e) => { 

    if(gameState != 'playing'){
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
    let misstagVärde = misstag
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
    gameState = 'vunnit'
  }
}


function CheckIfGameLost(){
  if(misstag === maxFel){
    document.querySelector('.input-container-rätt').innerHTML = 'Du har förlorat, spela igen?' 
    börjaOmBtn.style.display= 'block'
    gameState = 'förlorat'
    
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



//Linns kod
let button = document.querySelector('button')
button.addEventListener('click', event => {
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
// För att lägga till ett nytt resultat:
// 1. hämta data från localStorage -> lista
// 2. lägg till nya resultatet sist i listan
// 3. spara data i localStorage

// function saveResult() {
//   const resultatet = {
//     namn:inputNamn.value,
//     didWin: true,
//     antalmisstag: misstag,
//   };

//   const LS_KEY = 'hänga-gubbe-resultat';

//   let data = [];
//   let stringFromLocalStorage = localStorage.getItem(LS_KEY);
//   if(stringFromLocalStorage) {
//     data = JSON.parse(stringFromLocalStorage);
//   }

//   data.push(saveResult); 

//   let stringToSave = JSON.stringify(data);
//   localStorage.setItem(LS_KEY,stringToSave);
// }

// const saveButton = document.getElementById('save-button');
// saveButton.addEventListener('click', saveResult);


// Alis local-storage-kod

const skapaNamn = e =>{
  let formData = JSON.parse(localStorage.getItem('formdata')) || [];
  formData.push({
    namn:  document.querySelector('#spelarens-namn').value,
    antalMisstag: document.getElementById('misstag').value
  });
  localStorage.setItem('formData_' + Date.now(), JSON.stringify(formData));

  dispData();
  e.preventDefault();
}
function dispData(){
  console.log(localStorage.getItem('formData'));
  if(localStorage.getItem('formData')){
    let outpPut = document.getElementById('ul-poänglista');
 
    JSON.parse(localStorage.getItem('formData')).forEach(data => {
   
        
     
    });
  }
}

const skapaNamnButton = document.querySelector("#skapa-namn-knapp");
skapaNamnButton.addEventListener("click", skapaNamn);


  