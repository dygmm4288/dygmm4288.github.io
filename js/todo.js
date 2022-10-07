const todoForm = dGetId('todo-form');
const todoInput = dGetId('todo-input');
const todoSubmitBtn = selector(todoForm)('button');
const todoContainer = dGetId('todo-container');
const completeTodoContainer = dGetId('complete-todo-container');

const TODO_KEY = 'todo';
const DECORATION = 'text-decoration';
/* Todo Type
    object : {
        id: number,
        description: string,
        checked: boolean
    }
 */

/* Event */
function onSubmitTodo(e) {
    e.preventDefault();

    const todoValue = todoInput.value;
    todoInput.value = '';
    /* Storage Set */
    const nextTodos = getTodo();
    nextTodos.push({
        id: Date.now(),
        description: todoValue,
        checked: false,
    });
    /* Update UI */
    paintTodo(nextTodos);
}
addEvent(todoForm, 'submit', (e) => onSubmitTodo(e));
function onRemoveTodo(id) {
    const nextTodos = _.filter(getTodo(), (todo) => todo.id != id);
    paintTodo(nextTodos);
}
function onToggleTodo(id) {
    const nextTodos = _.map(getTodo(), (todo) => {
        if (todo.id === id) {
            todo.checked = !todo.checked;
        }
        return todo;
    });
    paintTodo(nextTodos);
}

/* Storage */
function setTodo(todos) {
    setStorage(TODO_KEY, JSON.stringify(todos));
    return todos;
}
function getTodo() {
    const todos = getStorage(TODO_KEY);
    return todos ? JSON.parse(todos) : [];
}
/* UI */
function paintTodo(todos) {
    updateTodo(todos);
    setTodo(todos);
}
function updateTodo(todos) {
    /* initate containera */
    todoContainer.innerHTML = '';
    completeTodoContainer.innerHTML = '';
    const [notCompleteTodos, completeTodos] = _.filterTwo(
        todos,
        (todo) => !todo.checked,
    );

    const notCompleteTodoItems = createTodoElement(notCompleteTodos);
    const completeTodoItems = createTodoElement(completeTodos);
    appendChild(todoContainer, notCompleteTodoItems);
    appendChild(completeTodoContainer, completeTodoItems);
}
function createTodoElement(todos) {
    if (!isArrayLike(todos)) {
        return [];
    }
    return _.map(todos, (todo) => {
        const li = ce('li');
        const removeIcon = createIcon('fa-solid', 'fa-trash');
        const checkedIcon = createIcon('fa-solid', 'fa-square-check');
        const unCheckedIcon = createIcon('fa-regular', 'fa-square');
        const p = ce('p');

        p.innerText = todo.description;
        if (todo.checked) {
            p.classList.add(DECORATION);
        } else {
            p.classList.remove(DECORATION);
        }

        /* events */
        addEvent(li, 'click', () => onToggleTodo(todo.id));
        addEvent(removeIcon, 'click', () => onRemoveTodo(todo.id));

        appendChild(li, [
            todo.checked ? checkedIcon : unCheckedIcon,
            p,
            removeIcon,
        ]);

        return li;
    });
}
