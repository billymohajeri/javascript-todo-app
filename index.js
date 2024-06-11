const todos = ["Todo 1", "Todo 2", "Todo 3"];

const listContainer = document.querySelector(".list-container");

const updateList = () => {
  todos.forEach((todo) => {
    let todoItem = document.createElement("li");
    todoItem.innerHTML = `<input type="checkbox" id="${todo}"><label for="${todo}">${todo}</label><input type="button" value="Delete">`;
    listContainer.appendChild(todoItem);
  });
};
window.addEventListener("load", updateList);



// console.log(todos);
// console.log(listContainer);
