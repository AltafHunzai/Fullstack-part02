export const Notification = ({ message }) => {
  if (message === '') {
    return (
      <></>
    )
  } if (message === null) {
    return (
      <></>
    )
  } else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

export const Success = ({ message }) => {
  if (message === '') {
    return (
      <></>
    )
  } if (message === null) {
    return (
      <></>
    )
  }
  else {

    return (
      <div className="success">
        {message}
      </div>
    )
  }
}