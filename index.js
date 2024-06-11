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
const updateList = () => {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    let todoItem = document.createElement("li");
    todoItem.innerHTML = `<input type="checkbox" id="${todo}"><label for="${todo}">${todo}</label><input type="button" value="Delete" class="del-btn" data-todo="${todo}">`;
    listContainer.appendChild(todoItem);
  });
  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      const todo = e.target.getAttribute("data-todo");
      handleDelete(todo);
    });
  });
  counter.innerHTML = todos.length;
};

updateList();
