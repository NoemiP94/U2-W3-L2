// creare form per inserire nome
// due pulsanti: 1 salva il valore in localStorage, l'altro rimuove il valore salvato se presente
// mostrare sopra input il valore salvato se presente

// prendo i riferimenti dell'input e button
const nameReference = document.getElementById('name')
const saveButton = document.getElementById('save-button')
const deleteButton = document.getElementById('delete-button')

const localStorageKey = 'name-memory'

// creo classe
class dataName {
  constructor(_name) {
    this.name = _name
  }
}
const names = []
// funzione per il bottone SALVA
const save = () => {
  // creo oggetto contenente la proprietà name, cioè il contenuto dell'input
  const newName = new dataName(nameReference.value)
  // salvo il contenuto nel localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(newName))
  alert('Nome salvato!')
  //   prendo il contenuto dal localStorage
  names.push(newName)
  const existingNames = localStorage.getItem(localStorageKey)
  if (existingNames) {
    // se entro qui ci sono salvataggi precedenti
    const existingNamesAsArray = Object.values(JSON.parse(existingNames)) //ora è un array su cui possiamo pushare
    console.log(existingNamesAsArray)
    existingNamesAsArray.push(newName) //aggiungo il nuovo nome all'array
    localStorage.setItem(localStorageKey, JSON.stringify(existingNamesAsArray))
  } else {
    // se entro qui prima non è stato salvato nulla
    names.push(newName)
    localStorage.setItem(localStorageKey, JSON.stringify(names))
  }
  // svuoto l'input
  nameReference.value = ''
  // funzione che aggiunge il nome alla lista
  generateList()
}

saveButton.addEventListener('click', save)

// funzione per il bottone ELIMINA
const reset = () => {
  // chiedo conferma all'utente
  if (window.confirm('ATTENZIONE! Eliminare il contenuto?')) {
    const existingNames = localStorage.getItem(localStorageKey)
    if (existingNames) {
      // se ci sono salvataggi
      // se clicco OK svuoto l'input
      nameReference.value = ''
      // svuoto il localStorage
      localStorage.removeItem(localStorageKey)
    } else {
      // entro qui se non ci sono salvataggi
      alert('ATTENZIONE! Non ci sono salvataggi presenti!')
    }
  }
}

deleteButton.addEventListener('click', reset)

// genero lista dei nomi
const generateList = () => {
  // prelevare i dati del localStorage e metterli nella lista
  const savedNames = localStorage.getItem(localStorageKey)
  console.log(savedNames) // è una stringa
  // prendere riferimento lista vuota
  const emptyList = document.getElementById('name-list')
  // svuoto lista per sicurezza
  emptyList.innerHTML = ''
  console.log(savedNames)
  const savedNamesAsArray = JSON.parse(savedNames) //diventa un array di stringhe
  console.log(savedNamesAsArray)

  if (savedNames) {
    savedNamesAsArray.forEach((element) => {
      let newLi = document.createElement('li')
      newLi.classList.add('list-group-item')
      newLi.innerText = `${element.name}`
      emptyList.appendChild(newLi)
    })
  }
}
