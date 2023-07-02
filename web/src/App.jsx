import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getAllTodos, createTodo, deleteTodo } from './services/todoServices';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    fetchData();
  }, []);

  const addTodoHandler = async (todo) => {
    const res = await createTodo(todo);
    setTodos([res, ...todos]);
  };

  const deleteHanlder = async (todoId) => {
    await deleteTodo(todoId);
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="bg-orange-200 flex justify-center items-center h-screen">
      <div className="container w-full max-w-2xl">
        <div className="text-3xl text-center font-bold mb-3 uppercase">
          Todo List
        </div>
        <div>
          <TodoForm addTodoHandler={addTodoHandler} />
        </div>
        <div className="bg-gray-100 mt-5 p-5 rounded-xl shadow-lg text-gray-700">
          <h1 className="font-bold text-xl italic block mb-0 leading-none">
            Todo
          </h1>
          <div className="max-h-80 overflow-y-auto">
            <TodoList todos={todos} deleteTodoHandler={deleteHanlder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
