import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import ButtonShow from "./ButtonShow";
import { useRef } from "react"

const Todo = () => {
  const firstIncompliteTaskRef = useRef(null)

  const onClickRef = () => firstIncompliteTaskRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <ButtonShow onClickRef={ onClickRef } />
      <TodoList firstIncompliteTaskRef={ firstIncompliteTaskRef } />
    </div>
  );
};

export default Todo;