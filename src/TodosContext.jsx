import { createContext, useMemo } from "react";
import useTasks from "./hooks/useTasks";

export const TodosContext = createContext({});

export const TodosProvider = ({ children }) => {
  const {
    filteredTasks,
    tasks,
    firstIncompliteTaskId,
    firstIncompliteTaskRef,
    deleteTask,
    deleteAllTasks,
    changeCheck,

    searchTask,
    setSearchTaskForm,
    searchTaskForm,
    searchRef,
    addTask,

    disappearingTaskId,
    appearingTaskId,
  } = useTasks();

  const value = useMemo(
    () => ({
      filteredTasks,
      tasks,
      firstIncompliteTaskId,
      firstIncompliteTaskRef,
      deleteTask,
      deleteAllTasks,
      changeCheck,
      searchTask,
      setSearchTaskForm,
      searchTaskForm,
      searchRef,
      addTask,

      disappearingTaskId,
      appearingTaskId,
    }),
    [
      filteredTasks,
      tasks,
      firstIncompliteTaskId,
      firstIncompliteTaskRef,
      deleteTask,
      deleteAllTasks,
      changeCheck,
      searchTask,
      setSearchTaskForm,
      searchTaskForm,
      searchRef,
      addTask,

      disappearingTaskId,
      appearingTaskId,
    ],
  );

  return <TodosContext value={ value }>{ children }</TodosContext>;
};