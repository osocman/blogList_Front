import { useState } from "react"
import blogService, { postOne } from "../services/blogService"

const BlogCreator = ({user, setBlogs, showNotification}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const blog = { title, author, url };
      const savedBlog = await blogService.postOne(blog);

      setBlogs((prevBlogs) => [...prevBlogs, savedBlog])
      setTitle('');
      setAuthor('');
      setUrl('');

      showNotification('Added blog to list', 5000);
    } catch (error) {
      showNotification(error.message, 10000)
    }
  }

  return (
    <form>
      <h2>Add blog</h2>
      <div>
        <p>Title</p>
        <input
        type="text"
        value={title}
        onChange= {(event) => setTitle(event.target.value)}
        >
        </input>
      </div>
      <div>
        <p>Author</p>
        <input
        type="text"
        value={author}
        onChange= {(event) => setAuthor(event.target.value)}
        >
        </input>
      </div>
      <div>
        <p>Blog URL</p>
        <input
        type="text"
        value={url}
        onChange= {(event) => setUrl(event.target.value)}
        >
        </input>
      </div>
      <p></p>
      <button onClick={addBlog}>Add</button>
      <hr/>
    </form>
  )
}

export default BlogCreator;