import axios from "axios";
const baseUrl = '/api/blogs'

let token = null;

const setTokenTo = (newToken) => {
  token = `bearer ${newToken}`;
}

const getAll = async() => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
}

const postOne = async(blog) => {
  const config = {
    headers: {
      'Authorization': token,
    }
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

export default { setTokenTo, getAll, postOne };