let todos = ["Todo 1", "Todo 2", "Todo 3"];

const listContainer = document.querySelector(".list-container");
const counter = document.querySelector(".count");
const addBtn = document.querySelector("#add-btn");
const newTodo = document.querySelector("#new-todo");

addBtn.addEventListener("click", () => {
  if (newTodo.value.trim()) {
    todos.push(newTodo.value.trim());
    newTodo.value = "";
    updateList();
  }
});

const handleDelete = (deletedItem) => {
  const index = todos.indexOf(deletedItem);
  if (index > -1) {
    todos.splice(index, 1);
  }
  updateList();
};

const handleEdit = (todoToEdit, editBtn) => {
  const label = editBtn.previousElementSibling.previousElementSibling;
  if (editBtn.value === "Edit") {
    const input = document.createElement("input");
    input.type = "text";
    input.value = todoToEdit;
    label.replaceWith(input);
    editBtn.value = "Save";
  } else {
    const newValue =
      editBtn.previousElementSibling.previousElementSibling.value.trim();
    if (newValue) {
      const index = todos.indexOf(todoToEdit);
      if (index !== -1) {
        todos[index] = newValue;
      }
    }
    updateList();
  }
};

const updateList = () => {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    let todoItem = document.createElement("li");
    todoItem.innerHTML = `<input type="checkbox" id="${todo}">
    <label for="${todo}">${todo}</label><input type="button" value="Delete" class="del-btn" data-todo="${todo}">
    <input type="button" value="Edit" class="edit-btn" data-todo="${todo}">`;
    listContainer.appendChild(todoItem);
  });
  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      const todo = e.target.getAttribute("data-todo");
      handleDelete(todo);
    });
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      const todo = e.target.getAttribute("data-todo");
      handleEdit(todo, e.target);
    });
  });

  counter.innerHTML = todos.length;
};

updateList();
