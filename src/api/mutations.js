import axios from "../httpClient";

function signup(credentials) {
  return axios.post(`/signup`, credentials);
}

function signin(credentials) {
  return axios.post(`/signin`, credentials);
}

function updateUser(values) {
  return axios.patch(`/update`, values);
}

function createPost(values) {
  return axios.post("/post", values);
}

function likePost(postId) {
  return axios.post(`/like?postId=${postId}`);
}

function deletePostsFromLikes(postId) {
  return axios.delete(`/deleteLikes?postId=${postId}`);
}

function deletePost(postId) {
  return axios.delete(`/delete?postId=${postId}`);
}

export default {
  signup,
  signin,
  createPost,
  likePost,
  updateUser,
  deletePost,
  deletePostsFromLikes,
};
