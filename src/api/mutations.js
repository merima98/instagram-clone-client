import axios from "../httpClient";

function signup(credentials) {
  return axios.post(`/signup`, credentials);
}

function signin(credentials) {
  return axios.post(`/signin`, credentials);
}

function updateUser(values) {
  return axios.put(`/updateUser`, values);
}

function createPost(values) {
  return axios.post("/post", values);
}

function likePost(postId) {
  return axios.post(`/like?postId=${postId}`);
}

function dislikePost(postId) {
  return axios.post(`/dislike?postId=${postId}`);
}

export default {
  signup,
  signin,
  createPost,
  likePost,
  dislikePost,
  updateUser,
};
