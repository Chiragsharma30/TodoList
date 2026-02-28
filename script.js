const input = document.getElementById("Todo-input");
const button = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoItem(todo, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = "0 8px";
    textspan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textspan.textContent = todo.text;
            saveTodos();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(deleteBtn);
    return li;
}

function render() {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const node = createTodoItem(todo, index);
        
        list.appendChild(node);
    });
}

function addtodos() {
    const text = input.value.trim();
    if (!text) {
        return;
    }
    todos.push({ text, completed: false });
    input.value = "";
    render();
    saveTodos();
}

button.addEventListener("click", addtodos);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addtodos();
    }
});
render();