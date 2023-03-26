const form = document.getElementById ('form');
const taskTitle = document.getElementById ('textInput');
const dueDate = document.getElementById ('dateInput');
const description = document.getElementById ('textarea');
const taskTitleErrorDiv = document.querySelector ('.taskTitleError');
const descriptionErrorDiv = document.querySelector ('.descriptionErrorDiv');
const add = document.getElementById ('add');

form.addEventListener ('submit', e => {
  e.preventDefault ();
  formValidation ();
});

const formValidation = () => {
  if (taskTitle.value === '') {
    taskTitleErrorDiv.innerHTML = 'Task Title cannot be blank';
  } else if (description.value === '') {
    descriptionErrorDiv.innerHTML = 'Description cannot be blank';
  } else {
    taskTitleErrorDiv.innerHTML = '';
    descriptionErrorDiv.innerHTML = '';
    acceptData ();
    displayTask ();
    add.setAttribute ('data-bs-dismiss', 'modal');
    add.click ();
    //IIFE
    (() => {
      add.setAttribute ('data-bs-dismiss', '');
    }) ();
  }
};

let data = [];

const acceptData = () => {
  data.push ({
    taskTitle: taskTitle.value,
    dueDate: dueDate.value,
    description: description.value,
  });
  // add the new array in the local storage
  addToLocalStorage ();
};

const tasks = document.getElementById ('tasks');

const displayTask = () => {
  tasks.innerHTML = '';
  data.map ((task, index) => {
    return (tasks.innerHTML += ` <div id="${index}">
        <p class="task-title">${task.taskTitle}</p>
        <span class="task-date small text-secondary">${task.dueDate}</span>
        <p class="task-description">${task.description}</p>
        <p class="options">
          <i  data-bs-toggle="modal" data-bs-target="#form" onClick = "editTask(this)" class="fa-solid fa-pen-to-square edit-btn"></i>
          <i onClick = "removeTask(this)" class="fa-solid fa-trash delete-btn"></i>
        </p>
      </div>`);
  });

  formReset ();
};

const formReset = () => {
  taskTitle.value = '';
  description.value = '';
  dueDate.value = '';
};

//removes task on click from todo app tasks list
const removeTask = e => {
  e.parentElement.parentElement.remove ();
  const divId = e.parentElement.parentElement.id;
  data.splice (divId, 1);
  // add this new array in the local storage
  addToLocalStorage ();
};

//edit a task on click from todo app tasks list
const editTask = e => {
  const parentContainer = e.parentElement.parentElement;

  taskTitle.value = parentContainer.children[0].innerHTML;
  dueDate.value = parentContainer.children[1].innerHTML;
  description.value = parentContainer.children[2].innerHTML;

  removeTask (e);
};

// ** this loads the data of local storage on dom whenever window is loaded
window.addEventListener ('load', () => {
    data = JSON.parse (localStorage.getItem ('data')) || [];
    displayTask ();
});

// ** Add to local storage
const addToLocalStorage = () => {
  localStorage.setItem ('data', JSON.stringify (data));
};
