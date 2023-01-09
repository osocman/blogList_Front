import { useEffect, useState, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogCreator from "./components/BlogCreator";
import Blog from "./components/Blog"
import Notification from "./components/Notification";
import blogService from "./services/blogService";
import loginService from "./services/loginService";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  const notificationEl = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    })
  }, [])

  useEffect(() => {
    const userInfoJSON = window.localStorage.getItem('userInfo');
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      setUser(userInfo);
      blogService.setTokenTo(userInfo.token);
    }
  }, [])

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login(username, password);
      blogService.setTokenTo(user.token);
      window.localStorage.setItem('userInfo', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('Oh no an error occured!');
      console.log(error);
    }
  };

  const showNotification = (message, duration) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, duration);
  }

  const BlogsOverview = () => (
    <>
      <h1>All blogs</h1>
      {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  if (user === null) {
    return (
      <LoginForm props={{username, setUsername, password, setPassword, handleLogin }} />
    )
  } else {
    return (
      <>
        {message && <Notification ref={notificationEl} message={message} />}
        <BlogCreator setBlogs={setBlogs} showNotification={showNotification} />
        <BlogsOverview />
      </>
    )
  }
}

export default App;
