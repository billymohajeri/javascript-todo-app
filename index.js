let todos = [];

const listContainer = document.querySelector(".list-container");
const counter = document.querySelector("#count");
const addBtn = document.querySelector("#add-btn");
const newTodo = document.querySelector("#new-todo");

addBtn.addEventListener("click", () => {
  if (newTodo.value.trim()) {
    const newTodoObj = {
      id: Date.now(),
      title: newTodo.value.trim(),
      done: true,
    };
    todos.push(newTodoObj);
    newTodo.value = "";
    updateList();
  }
});

const handleDelete = (deletedItemID) => {
  todos = todos.filter((todo) => {
    todo.id !== deletedItemID;
  });

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
    const { id, title, done } = todo;
    let todoItem = document.createElement("li");
    todoItem.innerHTML = `<input type="checkbox" id="${id}" checked="${done}">
    <label for="${id}">${title}</label><input type="button" value="Delete" class="del-btn" id="${id}">
    <input type="button" value="Edit" class="edit-btn" data-todo="${todo}">`;
    listContainer.appendChild(todoItem);
  });
  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", () => {
      handleDelete(delBtn.id);
    });
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      const todo = e.target.getAttribute("data-todo");
      handleEdit(todo, e.target);
    });
  });

  counter.innerHTML = `Total Todos: ${todos.length}`;
};

updateList();
