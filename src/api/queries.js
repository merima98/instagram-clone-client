import axios from "../httpClient";

function posts() {
  return axios.get(`/post`);
}

export default { posts };
