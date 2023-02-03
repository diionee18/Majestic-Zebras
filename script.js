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
parts.partTre.style.display = 'none'
parts.partFyra.style.display = 'none'
parts.partFem.style.display = 'none'

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




//KOPIERAD KOD FRÅN AI!
/*const secretWord = "javascript";
const ul = document.querySelector(".ul-bokstäver-rätt");
const mistakes = document.querySelector(".ul-fel-bokstäver");
let remainingLetters = secretWord.length;

for (const letter of secretWord) {
  const li = document.createElement("li");
  li.textContent = "_";
  ul.appendChild(li);
}

document.addEventListener("keypress", (event) => {
  const letter = event.key;
  let letterFound = false;

  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      const li = ul.children[i];
      li.textContent = letter;
      letterFound = true;
      remainingLetters--;
    }
  }
*/
  //Om bokstaven är fel 
  //Då ska den skapa en div
  //I diven ska den skriva ut en bokstav och sätta ut en del av hänga gubben


  //MIN KOD TILL EN BÖRJAN 
  const wronglettersword = []

  if (!letterFound) {
    const mistake = document.createElement("div");
    mistake.textContent = letter;
    
    parts.forEach(partEtt, 0) => { 
    const errors = wronglettersword 
      
    mistakes.appendChild(mistake);
  }

  if (remainingLetters === 0) {
    alert("Congratulations! You have won the game.");
  }
  
};


//path Varje bilds del - så att man kan få så att om det blir rätt eller fel. 
//Det handlar om att varje bild måste ha samma namn så att man kan göra en queryselector på allihopa! 
//(Kolla upp hur man kan göra så att alla bilders namn blir lika och att man kan göra en foreach på denna som jag visar i koden uvanför.  )



