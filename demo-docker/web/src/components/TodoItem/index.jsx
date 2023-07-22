import PropTypes from 'prop-types';

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <tr
      className={'transition duration-300 odd:bg-orange-100 even:bg-orange-50 '}
    >
      <td className="text-center  px-1 py-2 text-orange-800">{todo.id}</td>
      <td className=" px-1 py-2 text-orange-800">{todo.content}</td>
      <td className="text-center  px-1 py-2 text-orange-800 flex gap-3 justify-center">
        <button onClick={deleteTodo} className="text-orange-600 ">
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  deleteTodo: PropTypes.func,
};

export default TodoItem;
