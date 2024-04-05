// Recupero gli elementi di interesse dalla pagina
const container = document.querySelector('.container');
const title = document.getElementById('h1');
const button = document.querySelector('#add');
const inputField = document.querySelector('#input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const clear = document.querySelector('.clear');
const projectButton = document.querySelector('.create_project');
const input = document.querySelector('.projectNameInput');
const save = document.querySelector('.saveButton');
const undo = document.querySelector('.undoButton');
const menuAdd = document.querySelector('.project');
const collapsemenu = document.querySelector('.collapse__menu');
const rename = document.querySelector('.rename');
const renameInput = document.querySelector('.renameInput');
const renamePanel = document.querySelector('.renamePanel');
const renameSave = document.querySelector('.renameSave');
const renameUndo = document.querySelector('.renameUndo')
var caso = -1;
var nameProject;

// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';

// Preparo una lista di attività
let activities = [];

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);
}
/*===== NAVIGATION BAR  =====*/


/*----- espansione menù  -----*/
const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('expander')

      bodypadding.classList.toggle('body-pd')
    })
  }
}
showMenu('nav-toggle', 'navbar', 'body-pd')

/*----- LINK ACTIVE  -----*/
const linkColor = document.querySelectorAll('.nav__link')
function colorLink() {
  linkColor.forEach(l => l.classList.remove('active'))
  this.classList.add('active')
}
linkColor.forEach(l => l.addEventListener('click', colorLink))


/*----- contrazione menù  -----*/
const linkCollapse = document.getElementsByClassName('collapse__link')
var i

for (i = 0; i < linkCollapse.length; i++) {
  linkCollapse[i].addEventListener('click', function () {
    const collapseMenu = this.nextElementSibling
    collapseMenu.classList.toggle('showCollapse')

    const rotate = collapseMenu.previousElementSibling
    rotate.classList.toggle('rotate')
  })
}

/*=====  EVENTI  =====*/
inputField.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
})
projectButton.addEventListener('click', function () {
  //se la lista non è vuota
  if (activities.length > 0) {
    //finestra di conferma
    const check = window.confirm('sei sicuro di voler cancellare tutte le attività?');
    if (check) {
      // Cancella tutte le attività
      activities = []

      // Aggiorna anche il localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

      // Aggiorna la lista in pagina
      showContent();
    }

  }
  //
  container.style.display = 'none';
  menuAdd.style.display = (menuAdd.style.display === 'none') ? 'block' : 'none';
})

//Evento inserimento input
input.addEventListener('input', function () {
  //funzione cambio colore del pulsante salva
  changeSave();
});
//evento premi enter nell'input
input.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    //click del pulsante save
    save.click();
  }
})

//evento click del pulsante salva
save.addEventListener('click', function () {

  if (changeSave() == true) {
    nameProject = input.value;
    menuAdd.style.display = 'none';
    input.value = "";
    sendName(nameProject);
    container.style.display = 'block';
  }

});
//evento click del pulsante annulla
undo.addEventListener('click', function () {
  menuAdd.style.display = 'none';
  input.value = ""; //clear dell'input
  //checkLocalStorageForProjects();
});
//evento eliminazione di tutte le attività
clear.addEventListener('click', function () {
  //se la lista non è vuota
  if (activities.length > 0) {
    //finestra di conferma
    const check = window.confirm('sei sicuro di voler cancellare tutte le attività?');
    if (check) {
      // Cancella tutte le attività
      activities = []

      // Aggiorna anche il localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

      // Aggiorna la lista in pagina
      showContent();
    }

  }
});
//evento rename del progetto
rename.addEventListener('click', function () {
  renamePanel.style.display = (renamePanel.style.display === 'none') ? 'block' : 'none';
});
renameInput.addEventListener('input', function () {
  changeRenameSave();
});
renameInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    renameSave.click();
  }
})

renameSave.addEventListener('click', function () {
  if (changeRenameSave() == true) {
    const renameProject = renameInput.value;
    renameInput.value = "";
    renamePanel.style.display = 'none';
    sendName(renameProject);
  }
});
renameUndo.addEventListener('click', function () {
  renameInput.value = "";
  renamePanel.style.display = 'none;'
})

// Reagisco al click del bottone
button.addEventListener('click', function () {
  // Chiedo di aggiungre l'attività
  addActivity();
});

//FUNZIONI
clear.addEventListener('click', function () {
  //se la lista non è vuota
  if (activities.length > 0) {
    //finestra di conferma
    const check = window.confirm('sei sicuro di voler cancellare tutte le attività?');
    if (check) {
      // Cancella tutte le attività
      activities = []

      // Aggiorna anche il localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

      // Aggiorna la lista in pagina
      showContent();
    }

  }
});

//funzione cambio colore del pulsante Salva in base allo stato dell'input
function changeSave() {

  if (input.value.trim().length > 0) { // Controlla se l'input non è vuoto dopo aver rimosso eventuali spazi vuoti
    save.style.backgroundColor = 'rgb(173, 47, 47)'; // Cambia il colore
    save.style.color = 'white';
    return true;
  }
  else {
    save.style.backgroundColor = 'rgb(76,40,39)'
    save.style.color = 'rgb(110,100,100)'
    return false;
  }
}

function changeRenameSave() {
  if (renameInput.value.trim().length > 0) { // Controlla se l'input non è vuoto dopo aver rimosso eventuali spazi vuoti
    renameSave.style.backgroundColor = 'rgb(173, 47, 47)'; // Cambia il colore
    renameSave.style.color = 'white';
    return true;
  }
  else {
    renameSave.style.backgroundColor = 'rgb(76,40,39)'
    renameSave.style.color = 'rgb(110,100,100)'
    return false;
  }
}


/*=====  Attività  =====*/

// Funzione che decide cosa mostrare in pagina
function showContent() {
  // Innanzitutto pulisco tutto
  todoList.innerText = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {
    // Se c'è almeno una attività...
    // per ciascuna attività...
    activities.forEach(function (activity) {
      // Crea un template HTML
      const template = createActivityTemplate(activity)

      // Inseriscilo in pagina
      todoList.innerHTML += template;
    });

    // Rendi cliccabili i check
    makeCheckClickable();



  } else {
    // ALTRIMENTI
    // Mostra il messaggio di lista vuota
    emptyListMessage.innerText = 'Sembra che non ci siano attività';
  }

}

// Funzione per rendere i check cliccabili
function makeCheckClickable() {
  // Cerca tutti i check e fa' sì che siano cliccabili
  const checks = document.querySelectorAll('.todo-check');
  // Per ognuno dei check...
  checks.forEach(function (check, index) {
    // Aggiungi una reazione al click
    check.addEventListener('click', function () {
      const control = window.confirm("sei sicuro di voler rimuovere l'attività?")
      if (control) {
        // Rimuovi l'elemento dalla lista
        activities.splice(index, 1);

        // Aggiorna anche il localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        // Aggiorna la lista in pagina
        showContent();
      }
    });
  })

}

// Funzione per aggiungere un'attività
function addActivity() {
  // Recupero il testo nel campo
  const newActivity = inputField.value.trim();

  // Se il campo non è vuoto... 
  if (newActivity.length > 0) {

    // Aggiungo l'attività alla lista
    activities.push(newActivity);

    // Aggiorna lo storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

    // Ora, ridecidi cosa mostrare
    showContent();

    // svuoto il campo
    inputField.value = '';
  }
}

// Funzione che crea un template HTML per un'attività
function createActivityTemplate(activity) {
  // Restituisci questo pezzo di HTML
  return `
   <li class="todo-item">
     <div class="todo-check">
       <img src="assets/images/check.png" alt="Check Icon">
     </div>
     <p class="todo-text">${activity}</p>
   </li>
   `;
}

function sendName(name) {
  title.innerText = name;
  showContent();
}
