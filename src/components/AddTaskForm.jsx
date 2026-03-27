import Field from "./Field";
import Button from "./Button";
import { useState } from "react";
import useTasks from "../hooks/useTasks.js"

const AddTaskForm = () => {
  const { addTask, searchRef } = useTasks()
  const [error, setError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitle = clearNewTaskTitle.length === 0;

  function onSubmit(e) {
    e.preventDefault()

    if (!isNewTaskTitle) {
      addTask(clearNewTaskTitle);
      () => setNewTaskTitle("")
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