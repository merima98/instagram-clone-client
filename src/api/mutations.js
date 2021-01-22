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

function likePost(postId, userId) {
  return axios.post(`/like?postId=${postId}&userId=${userId}`);
}

function dislikePost(postId, userId) {
  return axios.post(`/dislike?postId=${postId}&userId=${userId}`);
}

export default { signup, signin, createPost, likePost, dislikePost };
