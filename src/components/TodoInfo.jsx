import { memo, useMemo } from "react";
import Button from "./Button";
import { useContext } from "react";
import { TodosContext } from "../TodosContext";

const TodoInfo = () => {
  const { tasks, deleteAllTasks } = useContext(TodosContext);

  const total = tasks.length;
  const hasTasks = total > 0;

  const done = useMemo(() => {
    return tasks.filter((item) => item.isDone === true).length;
  }, [tasks]);

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Total tasks:<span>{ total }</span> IsDone: { done }
      </div>

      { hasTasks && (
        <Button
          handler={ deleteAllTasks }
          className="todo__delete-all-button"
          type="button"
          children="Delete All"
        />
      ) }
    </div>
  );
};

export default memo(TodoInfo);