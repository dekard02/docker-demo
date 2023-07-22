const api = 'http://localhost:8000/todos';

const getAllTodos = async () => {
  const res = await fetch(api).then((res) => res.json());
  return res.todos;
};

const createTodo = async (todo) => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

  return res.todo;
};

const deleteTodo = async (id) => {
  await fetch(`${api}/${id}`, { method: 'delete' });
};

const updateTodo = async (id, todo) => {
  const res = await fetch(`${api}/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
  return res.todo;
};

export { createTodo, getAllTodos, deleteTodo, updateTodo };
