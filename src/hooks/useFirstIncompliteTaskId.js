import { useTasksStore } from "@/store"

export const useFirstIncompliteTaskId = () => {
  const tasks = useTasksStore(state => state.tasks)

  if (!tasks || !Array.isArray(tasks)) {
    return null
  }

  return tasks.find(task => !task.isDone)?.id
}