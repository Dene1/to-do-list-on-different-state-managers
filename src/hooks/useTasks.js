import { useSelector, useDispatch } from "react-redux";
import { useRef, useMemo, useCallback, useEffect } from "react";
import * as tasksActions from "../store/actions/tasksActions";
import tasksApi from "../api/tasksAPI";

const useTasks = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const firstIncompliteTaskRef = useRef(null);

  const tasks = useSelector(state => state?.tasks || []);
  const searchTaskForm = useSelector(state => state?.searchTaskForm || "");
  const disappearingTaskId = useSelector(state => state?.disappearingTaskId || null);
  const appearingTaskId = useSelector(state => state?.appearingTaskId || null);

  const firstIncompliteTaskId = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) return undefined;
    return tasks.find(({ isDone }) => !isDone)?.id;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) return null;
    const clearSearchQuery = searchTaskForm.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null;
  }, [searchTaskForm, tasks]);

  const handleAddTask = useCallback((title, callbackAfterAdding) => {
    tasksApi.add({ title, isDone: false }).then((newTask) => {
      dispatch(tasksActions.addTaskSync(newTask));
      dispatch(tasksActions.setAppearingTaskId(newTask.id));
      dispatch(tasksActions.setSearchForm(""));

      if (callbackAfterAdding) {
        callbackAfterAdding();
      }

      setTimeout(() => {
        dispatch(tasksActions.clearAppearingTaskId());
      }, 400);
    });
  }, [dispatch]);

  const handleDeleteTask = useCallback((taskId) => {
    const ask = confirm("Вы действительно хотите удалить задачу?");
    if (ask) {
      dispatch(tasksActions.setDisappearingTaskId(taskId));
      tasksApi.delete(taskId).then(() => {
        dispatch(tasksActions.deleteTaskSync(taskId));

        setTimeout(() => {
          dispatch(tasksActions.clearDisappearingTaskId());
        }, 400);
      });
    }
  }, [dispatch]);

  const handleDeleteAllTasks = useCallback(() => {
    const ask = confirm("Вы действительно хотите удалить все задачи?");
    if (ask) {
      tasksApi.deleteAll(tasks).then(() => {
        dispatch(tasksActions.deleteAllTasksSync());
      });
    }
  }, [dispatch, tasks]);

  const handleChangeCheck = useCallback((taskId, isDone) => {
    tasksApi.toggleComplete(taskId, isDone).then(() => {
      dispatch(tasksActions.toggleCompleteSync(taskId, isDone));
    });
  }, [dispatch]);

  const handleSearchTask = useCallback((e) => {
    dispatch(tasksActions.setSearchForm(e.target.value));
  }, [dispatch]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
    tasksApi.getAll().then((fetchedTasks) => {
      dispatch(tasksActions.setTasks(fetchedTasks || []));
    });
  }, [dispatch]);

  return {
    filteredTasks,
    tasks,
    firstIncompliteTaskId,
    firstIncompliteTaskRef,
    deleteTask: handleDeleteTask,
    deleteAllTasks: handleDeleteAllTasks,
    changeCheck: handleChangeCheck,
    disappearingTaskId,
    appearingTaskId,
    searchTask: handleSearchTask,
    searchTaskForm,
    searchRef,
    addTask: handleAddTask,
  };
};

export default useTasks;