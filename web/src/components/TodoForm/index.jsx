import PropTypes from 'prop-types';
import { useState } from 'react';

const TodoForm = ({ addTodoHandler }) => {
  const [content, setContent] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    if (!content) {
      alert('Todo không được bỏ trống');
      return;
    }
    addTodoHandler({ content });
    setContent('');
  };

  return (
    <form onSubmit={submitHandler} className="flex justify-center ">
      <input
        type="text"
        name="todo"
        placeholder="Nhập Todo"
        value={content}
        className="text-xl text-orange-800 placeholder-orange-400 py-2 px-5 bg-orange-100 rounded-l-full outline-orange-300"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="text-xl text-orange-100 placeholder-orange-400 py-2 pr-5 pl-4 bg-orange-500 rounded-r-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodoHandler: PropTypes.func,
};

export default TodoForm;
