import { useTasksStore } from "@/store/index.js"

const SearchTaskForm = () => {
  const searchTaskForm = useTasksStore(state => state.searchTaskForm)
  const searchTask = useTasksStore(state => state.searchTask)

  return (
    <form className="todo__form">
      <div className="todo__field field">
        <label
          className="field__label"
          htmlFor="search-task"
        >
          Search task
        </label>
        <input
          className="field__input"
          id="search-task"
          placeholder=" "
          autoComplete="off"
          type="search"
          value={ searchTaskForm }
          onChange={ searchTask }
        />
      </div>
    </form>
  )
}

export default SearchTaskForm