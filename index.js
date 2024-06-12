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
    return todo.id !== deletedItemID;
  });

  updateList();
};

const handleEdit = (todoToEditID) => {
  const label = document.getElementById(`lbl${todoToEditID}`);
  const editBtn = document.getElementById(`edt${todoToEditID}`);
  if (editBtn.value === "Edit") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `input${todoToEditID}`;
    input.value = label.textContent;
    label.replaceWith(input);
    editBtn.value = "Save";
  } else {
    const input = document.getElementById(`input${todoToEditID}`);
    const newValue = input.value.trim();
    if (newValue) {
      const index = todos.findIndex(
        (todo) => todo.id === parseInt(todoToEditID)
      );
      if (index !== -1) {
        todos[index].title = newValue;
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
    todoItem.innerHTML = `<input type="checkbox" checked="${done}">
    <label for="${id}" id="lbl${id}">${title}</label><input type="button" value="Delete" class="del-btn" id="del${id}">
    <input type="button" value="Edit" class="edit-btn" id="edt${id}">`;
    listContainer.appendChild(todoItem);
  });
  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", () => {
      const delID = parseInt(delBtn.id.replace("del", ""));
      handleDelete(delID);
    });
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const edtID = parseInt(editBtn.id.replace("edt", ""));
      handleEdit(edtID);
    });
  });

  counter.innerHTML = `Total Todos: ${todos.length}`;
};

updateList();
