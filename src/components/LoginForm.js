const LoginForm = ({props}) => {

  const {
  username, 
  setUsername, 
  password, 
  setPassword,
  handleLogin
  } = props

  return (
    <form>
      <h2>Welcome</h2>
      <div>
        Username{' '}
        <input
        type="text"
        value={username}
        onChange= {(event) => setUsername(event.target.value)}
        >
        </input>
      </div>
      <div>
        Password{' '}
        <input
        type="text"
        value={password}
        onChange= {(event) => setPassword(event.target.value)}>
        </input>
      </div>
      <button onClick={handleLogin}>Log in</button>
    </form>
  )
}


export default LoginForm;