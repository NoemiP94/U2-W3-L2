// creare form per inserire nome
// due pulsanti: 1 salva il valore in localStorage, l'altro rimuove il valore salvato se presente
// mostrare sopra input il valore salvato se presente

// prendo i riferimenti dell'input e button
const nameReference = document.getElementById('name')
const saveButton = document.getElementById('save-button')
const deleteButton = document.getElementById('delete-button')
const emptyList = document.getElementById('name-list')

const savedName = localStorage.getItem('userName')
if (savedName) {
  emptyList.textContent = `Previous Name: , ${savedName}`
}

const saveName = () => {
  const userName = nameReference.value.trim()

  if (userName !== '') {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      emptyList.textContent = `Previous Name: ${storedName}`
    }
    localStorage.setItem('userName', userName)
  }
}

const removeName = () => {
  localStorage.removeItem('userName')
  emptyList.textContent = 'Previous Name: '
}

// creare contatore che tenga conto del tempo che passa in sessionStorage
const timerDiv = document.getElementById('timer')
let elapsedTime = parseInt(sessionStorage.getItem('elapsedTime')) || 0
timerDiv.textContent = `${elapsedTime} seconds`

const updateTimer = () => {
  timerDiv.textContent = `${elapsedTime} seconds`
  elapsedTime++
  sessionStorage.setItem('elapsedTime', elapsedTime)
}

setInterval(updateTimer, 1000)
saveButton.addEventListener('click', saveName)
deleteButton.addEventListener('click', removeName)
// generateList()
