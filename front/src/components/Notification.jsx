
const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
    
    const style = (isError) ? { color: 'red'} : { color: 'green'}

    return (
      <div className='notif' style={style}>
        {message}
      </div>
    )
}   

export default Notification