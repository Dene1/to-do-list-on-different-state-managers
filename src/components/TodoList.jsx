import { memo, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useTasksStore } from "@/store"
import useFilteredTasks from "@/hooks/useFilteredTasks.js"

const TodoList = ({ firstIncompliteTaskRef }) => {
  const filteredTasks = useFilteredTasks();
  const fetchTasks = useTasksStore(state => state.fetchTasks);
  const hasTasks = useTasksStore(state => state.tasks.length > 0);

  useEffect(() => {
    fetchTasks()
  }, [])

  if (!hasTasks) {
    return <div className="todo__empty-message">There are task not yet</div>;
  }
  if (!filteredTasks?.length) {
    return <div className="todo__empty-message">Task not found</div>;
  }

  return (
    <ul className="todo__list">
      { filteredTasks.map((task) => (
        <TodoItem key={ task.id } { ...task }
                  firstIncompliteTaskRef={ firstIncompliteTaskRef } />
      )) }
    </ul>
  );
};

export default memo(TodoList);