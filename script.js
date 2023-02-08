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
  saveData();
  // result();
  // dispData();
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
    
    // 1.Hämta den gammla datan (funktionen olddata)
    // 2. Skapa ett objekt som beskriver resultatet (objekt)
    // 3. Lägg till objektet i gammla datan.
    // 4. ta den nya arrayen och pusha tillbaka till local-storage
    // 5. Uppdatera hela score-vyn (rendera score-vyn)

    //Det som ska finnas i resultat-objektet är Spelarens namn, antal gissningar och om man vann eller förlorade.
    // { namn, antalGissningar, vinstFörlust}


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


// Alis local-storage-kod

// const skapaNamn = e =>{
//   let formData = JSON.parse(localStorage.getItem('formdata')) || [];
//   formData.push({
//     namn:  document.querySelector('#spelarens-namn').value,
//     antalMisstag: document.getElementById('misstag').value
//   });
//   localStorage.setItem('formData_' + Date.now(), JSON.stringify(formData));

//   dispData();
//   e.preventDefault();
// }
// function dispData(){
//   console.log(localStorage.getItem('formData'));
//   if(localStorage.getItem('formData')){
//     let outpPut = document.getElementById('ul-poänglista');
//     JSON.parse(localStorage.getItem('formData')).forEach(data => {
//       let li = document.createElement('li');
//       let textNode = document.createTextNode(data.namn + ": " + data.antalMisstag + " misstag");
//       li.appendChild(textNode);
//       outpPut.appendChild(li);
//     });
//   }
// }


// const skapaNamnButton = document.querySelector("#skapa-namn-knapp");
// skapaNamnButton.addEventListener("click", skapaNamn);




//Ann-Sophie local kod

function saveData() {
  //get data från input box
  let newData = inputNamn.value; 

  //if there is nothing saved at the start then save a empty array
  if(localStorage.getItem('data') == null) {
    localStorage.setItem('data', '[]'); 
  }

  //get old data and stop it to the new data
  const oldData = JSON.parse(localStorage.getItem('data'));
  oldData.push(newData); 
  

  //save the old data + new data to local storage 
  localStorage.setItem('data',JSON.stringify(oldData));
}


function result(){
  if(localStorage.getItem('data' != null)) {
    document.querySelector('#ul-poänglista').innerHTML = JSON.parse(localStorage.getItem('data'));
  }
}

const poängLista = document.querySelector('#ul-poänglista')
let item = document.createElement('li')
  item.innerText = 'Namn: ',

poängLista.append(item);


