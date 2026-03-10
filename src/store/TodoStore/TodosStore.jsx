import { create } from "zustand"
import tasksApi from "../../api/tasksAPI.js"

const useTodosStore = create((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const tasks = await tasksApi.getAll()
    set(tasks)
  },
}))