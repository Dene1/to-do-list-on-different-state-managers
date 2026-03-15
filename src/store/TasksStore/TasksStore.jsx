import { create } from "zustand"
import tasksApi from "@/api/tasksAPI.js"
import { devtools } from "zustand/middleware"

export const useTasksStore = create(devtools((set, get, api) => ({
      tasks: [],
      searchTaskForm: "",
      disappearingTaskId: null,
      appearingTaskId: null,

      fetchTasks: async () => {
        const tasks = await tasksApi.getAll()
        set({ tasks }, false, { type: "setTasks", payload: tasks })
      },

      addTask: (title) => set(async () => {
        const newTask = { title, isDone: false }
        const addedTask = await tasksApi.add(newTask)

        set(state => ({
          tasks: [...state.tasks, addedTask],
          searchTaskForm: "",
          appearingTaskId: addedTask.id,
        }), false, { type: "tasks/add", payload: addedTask })
        setTimeout(() => set({ appearingTaskId: null }), 400)
      }),

      changeCheck: async (taskId, isDone) => {
        await tasksApi.toggleComplete(taskId, isDone)
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, isDone } : task
          )
        }), false, { type: "tasks/toggle/success", payload: { taskId, isDone } })
      },

      deleteTask: async (taskId) => {
        const ask = confirm("Вы действительно хотите удалить задачу?")
        if (ask) {
          set({ disappearingTaskId: null })

          await tasksApi.delete(taskId)
          set({ disappearingTaskId: taskId })

          setTimeout(() => {
            set(state => ({
              tasks: state.tasks.filter((task) => task.id !== taskId),
              disappearingTaskId: null,
            }), false, { type: "tasks/delete", payload: taskId })
          }, 400)
        }
      },

      deleteAllTasks: async () => {
        const ask = confirm("Вы действительно хотите удалить все задачи?")
        const { tasks } = get()
        if (ask) {
          await tasksApi.deleteAll(tasks)
          set({ tasks: [] })
        }
      },

      searchTask: (e) => set({ searchTaskForm: e.target.value }),
    }
  ),
  {
    store: "tasksStore", enabled:
      process.env.NODE_ENV !== "production"
  }
))