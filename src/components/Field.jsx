const Field = ({value, id, ref, onInput, error}) => {

  return (
    <div className="todo__field field">
      <label
        className="field__label"
        htmlFor={id}
      >
        New task
      </label>
      <input
        className={`field__input ${error ? 'is-invalid' : ''}`}
        id={id}
        placeholder=" "
        type="text"
        ref={ref}
        value={value}
        onInput={onInput}
        autoComplete="off"
      />
      {error && (<span className="field__error" title={error}>{error}</span>)}
    </div>
  )
}

export default Field
