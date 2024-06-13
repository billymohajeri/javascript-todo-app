let todos = [];

const listContainer = document.querySelector(".list-container");
const counter = document.querySelector("#count");
const addBtn = document.querySelector("#add-btn");
const newTodo = document.querySelector("#new-todo");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const resetSearch = document.querySelector("#reset-search");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newTodo.value.trim()) {
    const newTodoObj = {
      id: Date.now(),
      title: newTodo.value.trim(),
      isDone: false,
    };
    todos.push(newTodoObj);
    setStorage(todos);
    newTodo.value = "";
    updateList(todos);
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetSearch.disabled = false;
  const searchValue = searchInput.value.trim();
  const filteredTodos = todos.filter((todo) => {
    return todo.title.includes(searchValue);
  });
  searchInput.value = "";
  updateList(filteredTodos);
});

resetSearch.addEventListener("click", () => {
  resetSearch.disabled = true;
  updateList(todos);
});

const handleCheck = (id, flag) => {
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  todos[index].isDone = !flag;
  setStorage(todos);
  updateList(todos);
};

const handleDelete = (deletedItemID) => {
  todos = todos.filter((todo) => {
    return todo.id !== deletedItemID;
  });
  setStorage(todos);
  updateList(todos);
};

const handleEdit = (todoToEditID) => {
  const label = document.getElementById(`lbl${todoToEditID}`);
  const editBtn = document.getElementById(`edt${todoToEditID}`);
  if (editBtn.innerHTML.includes("fa-pen-to-square")) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `input${todoToEditID}`;
    input.value = label.textContent;
    label.replaceWith(input);
    editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  } else {
    const input = document.getElementById(`input${todoToEditID}`);
    const newValue = input.value.trim();
    if (newValue) {
      const index = todos.findIndex(
        (todo) => todo.id === parseInt(todoToEditID)
      );
      if (index !== -1) {
        todos[index].title = newValue;
        setStorage(todos);
      }
    }
    updateList(todos);
  }
};

const updateList = (todos) => {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    const { id, title, isDone } = todo;

    let todoItem = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left-div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `chk${id}`;
    checkbox.checked = isDone;
    checkbox.addEventListener("click", () => handleCheck(id, isDone));

    const label = document.createElement("label");
    label.id = `lbl${id}`;
    label.htmlFor = `chk${id}`;
    label.textContent = title;
    if (isDone) {
      label.classList.add("line-through");
    } else {
      label.classList.remove("line-through");
    }

    leftDiv.append(checkbox, label);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right-div");

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.addEventListener("click", () => handleDelete(id));

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.id = `edt${id}`;
    editBtn.addEventListener("click", () => handleEdit(id));

    rightDiv.append(delBtn, editBtn);

    todoItem.append(leftDiv, rightDiv);
    listContainer.appendChild(todoItem);
  });

  counter.innerHTML = `Total Todos: ${todos.length}`;
};

window.addEventListener("DOMContentLoaded", () => {
  resetSearch.disabled = true;
  getStorage();
  updateList(todos);
});

const setStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getStorage = () => {
  todos = JSON.parse(localStorage.getItem("todos"));
};
