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


