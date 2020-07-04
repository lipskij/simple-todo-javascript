const input = document.getElementById('input');
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const todoList = document.getElementById('list');
const addBtn = document.querySelector('.fa-plus-circle');

// event listeners
addBtn.addEventListener('click', addTodo);
document.addEventListener('click', checkTodo);
document.addEventListener('DOMContentLoaded', getTodos);
clear.addEventListener('click', clearTodo);

// show date
options = {weekday: 'long', month: 'long', day: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('eu-US', options);

function addTodo(e) {
  e.preventDefault();
  // create li in ul
  const todo = document.createElement('li');
  todo.innerHTML = input.value;
  todo.classList.add('item');
  todoList.appendChild(todo);
  // add to local storage
  addToLocalStorage(input.value);
  // add complete btn
  const doneBtn = document.createElement('div');
  doneBtn.innerHTML = '<i class="fas fa-check"></i>';
  todo.appendChild(doneBtn);
  // add delte btn
  const deleteBtn = document.createElement('div');
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  todo.appendChild(deleteBtn);
  // clear input
  input.value = '';
}

function checkTodo(e) {
  const item = e.target;
  if (item.classList[1] === 'fa-check') {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle('lineThrough');
  }
  if (item.classList[1] === 'fa-trash-alt') {
    const todo = item.parentElement.parentElement;
    removeTodos(todo);
    todo.remove();
  }
}

// add items to localstorage
function addToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos from lockal storage
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todoItems) {
    const todo = document.createElement('li');
    todo.classList.add('item');
    todoList.appendChild(todo);
    // add li item to screen
    todo.innerHTML = todoItems;
    // add complete btn
    const doneBtn = document.createElement('div');
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(doneBtn);
    // add delte btn
    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    todo.appendChild(deleteBtn);
  });
}

function removeTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// clear todo
function clearTodo() {
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  // clear from local storage
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}

// add todo filter