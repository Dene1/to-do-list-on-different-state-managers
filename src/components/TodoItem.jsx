import RouterLink from "./RouterLink";
import { useTasksStore } from "@/store/index.js"
import { useShallow } from "zustand/react/shallow"
import { useMemo } from "react"

const TodoItem = ({
                    id,
                    title,
                    isDone,
                    firstIncompliteTaskRef
                  }) => {
  const {
    changeCheck,
    disappearingTaskId,
    appearingTaskId,
    deleteTask,
  } = useTasksStore(useShallow(state => ({
    changeCheck: state.changeCheck,
    disappearingTaskId: state.disappearingTaskId,
    appearingTaskId: state.appearingTaskId,
    deleteTask: state.deleteTask,
  })))

  const firstIncompliteTaskId = useTasksStore(
    state => state.tasks.find(task => !task.isDone)?.id
  )

  return (
    <li
      style={ { border: disappearingTaskId === id ? "2px solid red" : "none" } }
      className={ `todo__item todo-item ${ disappearingTaskId === id ? "is-disappearing" : "" }
       ${ appearingTaskId === id ? "is-appearing" : "" }` }
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
        onClick={ () => deleteTask(id) }
      >
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