import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import tasksApi from "../api/tasksAPI"

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [searchTaskForm, setSearchTaskForm] = useState("")
  const searchRef = useRef(null)
  const firstIncompliteTaskRef = useRef(null)
  const firstIncompliteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  const [disappearingTaskId, setDisappearingTaskId] = useState(null)
  const [appearingTaskId, setAppearingTaskId] = useState(null)

  const addTask = useCallback((title, callbackAfterAdding) => {
    const newTask = {
      title,
      isDone: false,
    }

    tasksApi.add(newTask).then((addTask) => {
      setTasks((prev) => [...prev, addTask])
      callbackAfterAdding()
      setSearchTaskForm("")
      searchRef.current.focus()
      setAppearingTaskId(addTask.id)
      setTimeout(() => setAppearingTaskId(null), 400)
    })
  }, [])

  const deleteAllTasks = useCallback(() => {
    const ask = confirm("Вы действительно хотите удалить все задачи?")
    if (ask) {
      tasksApi.deleteAll(tasks).then(() => setTasks([]))
    }
  }, [tasks])

  const changeCheck = useCallback(
    (taskId, isDone) => {
      tasksApi.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone }
            }

            return task
          }),
        )
      })
    },
    [tasks],
  )

  useEffect(() => {
    searchRef.current.focus()

    tasksApi.getAll().then(setTasks)
  }, [])

  const deleteTask = useCallback(
    (taskId) => {
      const ask = confirm("Вы действительно хотите удалить задачу?")
      if (ask) {
        tasksApi.delete(taskId).then(() => {
          setDisappearingTaskId(taskId)

          setTimeout(() => {
            setTasks(tasks.filter((task) => task.id !== taskId))
            setDisappearingTaskId(null)
          }, 400)
        })
      }
    },
    [tasks],
  )

  const searchTask = (e) => {
    setSearchTaskForm(e.target.value)
  }

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchTaskForm.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchTaskForm, tasks])

  return {
    filteredTasks,
    tasks,
    firstIncompliteTaskId,
    firstIncompliteTaskRef,
    deleteTask,
    deleteAllTasks,
    changeCheck,

    disappearingTaskId,
    appearingTaskId,

    searchTask,
    setSearchTaskForm,
    searchTaskForm,
    searchRef,
    addTask,
  }
}

export default useTasks
