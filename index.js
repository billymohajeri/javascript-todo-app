const todos = ["Todo 1", "Todo 2", "Todo 3"];

const listContainer = document.querySelector(".list-container");
todos.forEach((todo) => {
  const todoLabel = document.createElement("label");
  todoLabel.textContent = todo;
  console.log(todoLabel);
  listContainer.appendChild(todoLabel);
});

console.log(todos);
console.log(listContainer);
