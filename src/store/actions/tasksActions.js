import * as types from "./actionTypes";

export const setTasks = (tasks) => ({
  type: types.FETCH_TASKS,
  payload: tasks,
});

export const addTaskSync = (task) => ({
  type: types.ADD_TASK,
  payload: task,
});

export const deleteTaskSync = (taskId) => ({
  type: types.DELETE_TASK,
  payload: taskId,
});

export const deleteAllTasksSync = () => ({
  type: types.DELETE_ALL_TASKS,
});

export const toggleCompleteSync = (taskId, isDone) => ({
  type: types.TOGGLE_COMPLETE,
  payload: { taskId, isDone },
});

export const setSearchForm = (value) => ({
  type: types.SET_SEARCH_FORM,
  payload: value,
});

export const setDisappearingTaskId = (taskId) => ({
  type: types.SET_DISAPPEARING_TASK_ID,
  payload: taskId,
});

export const setAppearingTaskId = (taskId) => ({
  type: types.SET_APPEARING_TASK_ID,
  payload: taskId,
});

export const clearDisappearingTaskId = () => ({
  type: types.CLEAR_DISAPPEARING_TASK_ID,
});

export const clearAppearingTaskId = () => ({
  type: types.CLEAR_APPEARING_TASK_ID,
});