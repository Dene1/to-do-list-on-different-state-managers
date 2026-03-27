import * as types from "../actions/actionTypes";

const initialState = {
  tasks: [],
  searchTaskForm: "",
  disappearingTaskId: null,
  appearingTaskId: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload || [],
      };

    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        searchTaskForm: "",
        appearingTaskId: action.payload.id,
      };

    case types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case types.DELETE_ALL_TASKS:
      return {
        ...state,
        tasks: [],
      };

    case types.TOGGLE_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, isDone: action.payload.isDone }
            : task
        ),
      };

    case types.SET_SEARCH_FORM:
      return {
        ...state,
        searchTaskForm: action.payload,
      };

    case types.SET_DISAPPEARING_TASK_ID:
      return {
        ...state,
        disappearingTaskId: action.payload,
      };

    case types.SET_APPEARING_TASK_ID:
      return {
        ...state,
        appearingTaskId: action.payload,
      };

    case types.CLEAR_DISAPPEARING_TASK_ID:
      return {
        ...state,
        disappearingTaskId: null,
      };

    case types.CLEAR_APPEARING_TASK_ID:
      return {
        ...state,
        appearingTaskId: null,
      };

    default:
      return state;
  }
};