import axios from "../httpClient";

function posts() {
  return axios.get(`/post`);
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

export default { posts, user, usersPosts, loggedUser };
