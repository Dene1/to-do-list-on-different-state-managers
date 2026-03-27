import useTasks from "../hooks/useTasks.js"

const SearchTaskForm = () => {
  const { searchTaskForm, searchTask } = useTasks()

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
          onChange={ (e) => searchTask(e) }
        />
      </div>
    </form>
  )
}

export default SearchTaskForm