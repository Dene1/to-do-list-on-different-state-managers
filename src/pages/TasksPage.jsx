import Todo from "../components/Todo"
import { TodosProvider } from "../TodosContext"

const TasksPage = () => {

  return (
    <TodosProvider>
      <Todo />
    </TodosProvider>
  )
}

export default TasksPage