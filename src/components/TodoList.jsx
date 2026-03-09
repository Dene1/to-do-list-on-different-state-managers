import { memo, useContext } from "react";
import TodoItem from "./TodoItem";
import { TodosContext } from "../TodosContext";

const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TodosContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">There are task not yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Task not found</div>;
  }

  return (
    <ul className="todo__list">
      { (filteredTasks ?? tasks).map((task) => (
        <TodoItem key={ task.id } { ...task } />
      )) }
    </ul>
  );
};

export default memo(TodoList);