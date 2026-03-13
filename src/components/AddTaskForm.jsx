import Field from "./Field";
import Button from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import { useTasksStore } from "@/store/index.js"

const AddTaskForm = () => {
  const addTask = useTasksStore(state => state.addTask);

  const searchRef = useRef(null)
  const [error, setError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitle = clearNewTaskTitle.length === 0;

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  function onSubmit(e) {
    e.preventDefault();

    if (!isNewTaskTitle) {
      addTask(clearNewTaskTitle);
      setNewTaskTitle("")
    }
  }

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "The task cannot be empty" : "");
  };

  return (
    <form className="todo__form"
          onSubmit={ onSubmit }>
      <Field id="new-task"
             value={ newTaskTitle }
             error={ error }
             ref={ searchRef }
             onInput={ onInput } />
      <Button children="Add"
              isDisabled={ isNewTaskTitle } />
    </form>
  );
};

export default AddTaskForm;