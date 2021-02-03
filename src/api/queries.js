import axios from "../httpClient";

function posts() {
  return axios.get(`/post`);
}
function getPostById(postId) {
  return axios.get(`/getPostById?postId=${postId}`);
}
function randomPosts() {
  return axios.get(`/randomPosts`);
}

function user(username) {
  return axios.get(`/user?username=${username}`);
}

function loggedUser() {
  return axios.get("/userById");
}

function usersPosts(username) {
  return axios.get(`/userspost?username=${username}`);
}

export default {
  posts,
  user,
  usersPosts,
  loggedUser,
  randomPosts,
  getPostById,
};
