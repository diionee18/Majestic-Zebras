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

const wordE1 = document.getAnimations('word');
const wrongLettersE1 = document.getElementById(ul-fel-bokstäver);
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document-querySelectorAll('.hela-figuren');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectionWord = words[Math.floor(Math.random()* words.length)];
const correctbokstäver = [];
const wrongbokstäver =[];

//Show hidden word
function displayWord(){
  wordE1.innerHTML = `
  ${selectedWord
    .split('')
    .map(
   letter =>
   <span class="letter">
   ${correctbokstäver.includes(bokstäver) ? bokstäver : ''}`
    </span>
    )
  .join('')}
  `;

  const innerWord = wordE1.innerText.replace(/\n/g, '');

  if(innerWord === selectWord){
    finalMessage.innerText = 'Grattis du vann';
    popup.style.display='flex';
  }
   }

   // wrong letters
   function updateWrongbokstäverE1(){
updateWrongbokstäverE1.innerHTML = `
${wrongbokstäver.length > 0 ? '<p>Wrong</p>' : ''}
${wrongbokstäver.map(bokstäver => `<span>${bokstäver}</span>`)}
 `;

 //display parts
 figureParts.forEach((part,index) => {
const errors = wrongbokstäver.length;

 if(index < errors ) {
  part.style.display = 'block'
 }
 else{
  part.style.display='none';
 }
 });

//check if lost
if(wrongbokstäver.length === hela-figuren.length){
  finalMessage.innerText='HA SÄMST.';
  popup.style.display = 'flex';
}
//Show notification
function showNotification(){
notification.classList.add('show');

setTimeout(()=> {
  notification.classList.remove('show');
}, 2000);
}
}
//keydown letter press
window.addEventListener('keydown', e =>{
  if(e.keyCode >= 65 && e.keyCode <=90){
    const bokstäver = e.key;

    if(selectedWord.includes(bokstäver)){
      if(!correctbokstäver.includes(bokstäver)){
        correctbokstäver.push(bokstäver);
        displayWord();
    } else {
      showNotification();
    }
} else{
  if(!wrongbokstäver.includes(bokstäver)){
    wrongbokstäver.push(bokstäver);

    updateWrongbokstäverE1()
  }else{
    showNotification
  }
}
  }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
//Emmty arrays
correctbokstäver.splice(0);
wrongbokstäver.splice(0);

selectedWord = words[Math.floor(Math.random() * words.length)];

displayWord();

updateWrongbokstäverE1();

popup.style.display= 'none';
});

displayWord();


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

 

document.querySelector(".max-fel").textContent = maxFel;

generateKnapp();
gissatOrd();

