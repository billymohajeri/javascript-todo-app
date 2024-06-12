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
      isDone: false,
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
      }
    }
    updateList();
  }
};

const updateList = () => {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    const { id, title, isDone } = todo;

    let todoItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;

    const label = document.createElement("label");
    label.id = `lbl${id}`;
    label.textContent = title;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.addEventListener("click", () => handleDelete(id));

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.id = `edt${id}`;
    editBtn.addEventListener("click", () => handleEdit(id));

    todoItem.append(checkbox, label, delBtn, editBtn);
    listContainer.appendChild(todoItem);
  });

  counter.innerHTML = `Total Todos: ${todos.length}`;
};

updateList();
