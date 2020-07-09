const input = document.getElementById("input");
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const todoList = document.getElementById("list");
const addBtn = document.querySelector(".fa-plus-circle");

let id = 0;

// event listeners
addBtn.addEventListener("click", addTodo);
document.addEventListener("click", checkTodo);
document.addEventListener("DOMContentLoaded", getTodos);
clear.addEventListener("click", clearTodo);

// show date
options = { weekday: "long", month: "long", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("eu-US", options);

function addTodo(e) {
  e.preventDefault();
  // create li in ul
  const todo = document.createElement("li");
  todo.classList.add("item");
  todo.innerHTML = input.value;
  // adding random id
  id = Math.floor(Math.random() * 1000);
  todo.id = id;
  // add complete btn
  const doneBtn = document.createElement("div");
  doneBtn.innerHTML = '<i class="fas fa-check"></i>';
  todo.appendChild(doneBtn);
  // add delte btn
  const deleteBtn = document.createElement("div");
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  todo.appendChild(deleteBtn);
  todoList.appendChild(todo);
  // add to local storage
  addToLocalStorage(input.value);
  // clear input
  input.value = "";
}

function checkTodo(e) {
  /** @type {Array<{ todo: string, done: boolean }>} */
  let todos = loadFromStorage();
  const item = e.target;
  if (item.classList[1] === "fa-check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("lineThrough");
    const todoIndex = todos.findIndex((item) => item.id == todo.id);
    // todos = [{ todo: 'aa', done: true }]
    // todoIndex = 0;
    /** @type {{ todo: string, done: boolean }} */
    let currentItem = todos[todoIndex]; // { todo: 'aa', done: true } // sort by id
    todos.splice(todoIndex, 1, {
      todo: todo.textContent,
      done: currentItem.done ? false : true,
      id: currentItem.id,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  if (item.classList[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    removeTodos(todo);
    todo.remove();
  }
}

// add items to localstorage
function addToLocalStorage(todo) {
  let todos = loadFromStorage();
  todos.push({ todo, done: false, id });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get todos from lockal storage
function getTodos() {
  let todos = loadFromStorage();

  todos.forEach(function (todoItem) {
    // create item
    const todo = document.createElement("li");

    // render item according to model
    if (todoItem.done === true) {
      todo.classList.add("lineThrough");
    }
    todo.classList.add("item");
    todo.innerHTML = todoItem.todo;
    todo.id = todoItem.id; 

    // add done btn
    const doneBtn = document.createElement("div");
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(doneBtn);

    // add delete btn
    const deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    todo.appendChild(deleteBtn);

    // finally add to the container
    todoList.appendChild(todo);
  });
}

function removeTodos(todo) {
  let todos = loadFromStorage();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// clear todo
function clearTodo() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  // clear from local storage
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}

function loadFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}