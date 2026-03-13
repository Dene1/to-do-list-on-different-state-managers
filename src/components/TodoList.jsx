import { memo, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useTasksStore } from "@/store"
import useFilteredTasks from "@/hooks/useFilteredTasks.js"

const TodoList = ({ firstIncompliteTaskRef }) => {
  const filteredTasks = useFilteredTasks();
  const tasks = useTasksStore(state => state.tasks);
  const fetchTasks = useTasksStore(state => state.fetchTasks);

  useEffect(() => {
    fetchTasks()
  }, [])

  const tasksToShow = filteredTasks ?? tasks
  const hasTasks = tasks.length > 0
  const hasVisibleTasks = tasksToShow.length > 0

  if (!hasTasks) {
    return <div className="todo__empty-message">There are task not yet</div>;
  }

  if (!hasVisibleTasks) {
    return <div className="todo__empty-message">Task not found</div>;
  }

  return (
    <ul className="todo__list">
      { (filteredTasks ?? tasks).map((task) => (
        <TodoItem key={ task.id } { ...task } firstIncompliteTaskRef={firstIncompliteTaskRef}/>
      )) }
    </ul>
  );
};

export default memo(TodoList);