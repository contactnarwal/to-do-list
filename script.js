const form = document.querySelector("form");
const list = document.querySelector(".list");
const itemsLeft = document.querySelector(".items-left");
const clearCompleted = document.querySelector(".clearall");

const buttonAll = document.querySelector(".nav-button--all");
const buttonActive = document.querySelector(".nav-button--active");
const buttonCompleted = document.querySelector(".nav-button--completed");

const updateUI = () => {
  const elements = list.querySelectorAll(
    ".list__item:not(.list__item--complete)"
  );
  const total = elements.length;
  itemsLeft.innerHTML = `${total} items left`;
};

updateUI();

const deleteTodo = liElement => {
  list.removeChild(liElement);
  updateUI();
};

const toggleTodo = liElement => {
  liElement.classList.toggle("list__item--complete");
  updateUI();
};

const addTodo = text => {
  const buttonCheck = document.createElement("button");
  buttonCheck.classList.add("button", "button--check", "list__button-check");
  buttonCheck.innerHTML = "&check;";

  buttonCheck.addEventListener("click", event =>
    toggleTodo(event.target.parentElement)
  );

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("button", "button--delete");
  buttonDelete.innerHTML = "&#215;";

  buttonDelete.addEventListener("click", event => {
    deleteTodo(event.target.parentElement);
  });

  const paragraph = document.createElement("p");
  paragraph.classList.add("list__text");
  paragraph.innerHTML = text;

  const todo = document.createElement("li");
  todo.classList.add("list__item");

  todo.appendChild(buttonCheck);
  todo.appendChild(buttonDelete);
  todo.appendChild(paragraph);

  list.appendChild(todo);

  updateUI();
};

form.addEventListener("submit", event => {
  event.preventDefault();

  const input = form.querySelector("input");
  const value = input.value;
  input.value = "";

  if (!value.length) {
    alert("Please enter a todo.");
    return;
  }

  addTodo(value);
});

buttonAll.addEventListener("click", () => {
  list.classList.add("list--all");
  list.classList.remove("list--active");
  list.classList.remove("list--completed");
  buttonAll.classList.add("nav-button--current");
  buttonActive.classList.remove("nav-button--current");
  buttonCompleted.classList.remove("nav-button--current");
});

buttonActive.addEventListener("click", () => {
  list.classList.remove("list--all");
  list.classList.add("list--active");
  list.classList.remove("list--completed");
  buttonAll.classList.remove("nav-button--current");
  buttonActive.classList.add("nav-button--current");
  buttonCompleted.classList.remove("nav-button--current");
});

buttonCompleted.addEventListener("click", () => {
  list.classList.remove("list--all");
  list.classList.remove("list--active");
  list.classList.add("list--completed");
  buttonAll.classList.remove("nav-button--current");
  buttonActive.classList.remove("nav-button--current");
  buttonCompleted.classList.add("nav-button--current");
});
clearCompleted.addEventListener("click", event => {
  completedItems = [...list.querySelectorAll(".list__item--complete"))];
  completedItems.forEach(el => deleteTodo(el));
  //deleteTodo(elements);
});
