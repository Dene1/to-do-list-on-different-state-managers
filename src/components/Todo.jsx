import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import ButtonShow from "./ButtonShow";
import { TodosContext } from "../TodosContext";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.jsx"

const Todo = () => {
  const { firstIncompliteTaskRef } = useContext(TodosContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const onClickRef = () => firstIncompliteTaskRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <button style={ { backgroundColor: theme === "dark" ? "gray" : "white" } }
              onClick={ changeTheme }
              className={ ` todo__btn` }>
        { theme === "dark" ? "🌙 Темная тема" : "☀️ Светлая тема" }
      </button>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <ButtonShow onClickRef={ onClickRef } />
      <TodoList />
    </div>
  );
};

export default Todo;