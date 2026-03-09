const ButtonShow = ({ onClickRef }) => {
  return (
    <button className="button"
            onClick={ onClickRef }
            type="submit">Show first todo incomplite task</button>
  )
}

export default ButtonShow