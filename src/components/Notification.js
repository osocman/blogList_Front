const Notification = ({message}) => {
  console.log(message);
  return (
    <div className="Notification">
      <p>{message}</p>
    </div>
  )
}

export default Notification;