import axios from "../httpClient";

function posts() {
  return axios.get(`/post`);
}
function user(username) {
  return axios.get(`/user?username=${username}`);
}

export default { posts, user };
