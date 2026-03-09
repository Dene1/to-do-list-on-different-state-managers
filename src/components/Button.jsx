const Button = ({ classes, children, handler, isDisabled }) => {
  return (
    <button className={ `${ classes } button` }
            disabled={ isDisabled }
            type="submit"
            onClick={ handler }>{ children }</button>
  )
}

export default Button