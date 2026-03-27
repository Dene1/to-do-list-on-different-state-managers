import Todo from "../components/Todo"
import ThemeContext from "../ThemeContext.jsx"
import { Provider } from "react-redux"
import store from "../store/TodoStore.js"

const TasksPage = () => {
  return (
    <Provider store={ store }>
      <ThemeContext>
        <Todo />
      </ThemeContext>
    </Provider>
  )
}

export default TasksPage