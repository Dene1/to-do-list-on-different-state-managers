import Todo from "../components/Todo"
import { TodosProvider } from "../TodosContext"
import ThemeContext from "../ThemeContext.jsx"

const TasksPage = () => {

  return (
    <TodosProvider>
      <ThemeContext>
        <Todo />
      </ThemeContext>
    </TodosProvider>
  )
}

export default TasksPage