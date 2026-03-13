import { useTasksStore } from "@/store"

const useFilteredTasks = () => {
  const tasks = useTasksStore(state => state.tasks)
  const searchTaskForm = useTasksStore(state => state.searchTaskForm)

  const clearSearchQuery = searchTaskForm.trim().toLowerCase()

  return clearSearchQuery.length > 0
    ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
    : null
}

export default useFilteredTasks