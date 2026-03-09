import { useContext } from "react";
import { TodosContext } from "../TodosContext";
import RouterLink from "./RouterLink";

const TodoItem = ({ id, title, isDone }) => {
  const {
    changeCheck,
    deleteTask,
    firstIncompliteTaskRef,
    firstIncompliteTaskId,
    appearingTaskId,
    disappearingTaskId,
  } = useContext(TodosContext);

  console.log({
    appearingTaskId,
    disappearingTaskId,
    id,
    isAppearing: appearingTaskId === id,
    isDisappearing: disappearingTaskId === id,
  });

  return (
    <li
      style={ { border: disappearingTaskId === id ? "2px solid red" : "none" } }
      className={ `todo__item todo-item
    ${ disappearingTaskId === id ? "is-disappearing" : "" } ${ appearingTaskId === id ? "is-appearing" : "" }` }
      ref={ id === firstIncompliteTaskId ? firstIncompliteTaskRef : null }>
      <input
        className="todo-item__checkbox"
        id={ id }
        type="checkbox"
        checked={ isDone }
        onChange={ ({ target }) => {
          changeCheck(id, target.checked);
        } }
      />
      <label className="todo-item__label visually-hidden"
             htmlFor={ id }>
        { title }
      </label>
      <RouterLink to={ `/tasks/${ id }` }
                  aria-label="Task detail page">
        { title }
      </RouterLink>
      <button
        className="todo-item__delete-button"
        aria-label="Delete"
        title="Delete"
        onClick={ () => deleteTask(id) }>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;