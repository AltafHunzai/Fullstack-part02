export const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export const Success  = ({ message }) => {
  if (message === null) {
    return null
  }else

  return (
    <div className="success">
      {message}
    </div>
  )
}