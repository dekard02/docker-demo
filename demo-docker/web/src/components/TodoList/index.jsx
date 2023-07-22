import TodoItem from '../TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, deleteTodoHandler }) => {
  return (
    <table id="todo_table" className="table w-full">
      <thead>
        <tr>
          <th className="text-center px-1 py-2 bg-orange-500 text-orange-100 rounded-tl-xl">
            #
          </th>
          <th className="text-left px-1 py-2 bg-orange-500 text-orange-100">
            Nội dung
          </th>
          <th className=" px-1 py-2 bg-orange-500 text-orange-100 rounded-tr-xl">
            Thao tác
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.length <= 0 && (
          <tr className="odd:bg-orange-100 even:bg-orange-50">
            <td className="text-center  px-1 py-2 text-orange-800" colSpan="3">
              Chưa có gì hết, thêm zô!!
            </td>
          </tr>
        )}
        {todos.map((todo, index) => {
          const deleteHandler = async () => {
            await deleteTodoHandler(todo.id);
          };
          return (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              deleteTodo={deleteHandler}
            />
          );
        })}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  deleteTodoHandler: PropTypes.func,
};

export default TodoList;
