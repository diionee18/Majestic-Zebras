const poängBtn = document.querySelector('.se-poäng-knapp')
const andraFönstret = document.querySelector('.visa-efter-start')
const inputNamn = document.querySelector('#spelarens-namn')
const spelaBtn = document.querySelector('.börja-spelet-knapp')
const förstaFönstret = document.querySelector('.upp-efter-klick')
const parts = {
  partEtt: document.querySelector('.part1'),
  partTvå: document.querySelector('.part2'),
  partTre: document.querySelector('.part3'),
  partFyra: document.querySelector('.part4'),
  partFem: document.querySelector('.part5'),
}


// Här kan man sätta dem till none så att dem ej visas
// och sedan så kan man använda if för att få fram dem.
parts.partEtt.style.display = 'none'
parts.partTvå.style.display = 'none'


förstaFönstret.style.display = ''
andraFönstret.style.display = 'none'


spelaBtn.addEventListener('click', () =>{
  const spelarensNamn = inputNamn.value
})

spelaBtn.addEventListener('click', function(){
  localStorage.setItem('inputValue', inputNamn.value)
})



function toggleSections() {
  if (förstaFönstret.style.display === 'block') {
    andraFönstret.style.display = 'none'
  } else {
    förstaFönstret.style.display = 'none'
    andraFönstret.style.display = 'block'
  }
}
spelaBtn.addEventListener('click', toggleSections)

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

