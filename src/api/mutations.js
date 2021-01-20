import axios from "../httpClient";

function signup(credentials) {
  return axios.post(`/signup`, credentials);
}

function signin(credentials) {
  return axios.post(`/signin`, credentials);
}

function createPost(values) {
  return axios.post("/post", values);
}

export default { signup, signin, createPost };
