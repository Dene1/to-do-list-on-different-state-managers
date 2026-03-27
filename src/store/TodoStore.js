import { legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./reducer/todo-reducer";

const store = createStore(tasksReducer);

export default store;