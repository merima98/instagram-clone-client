import axios from "../httpClient";

function signup(credentials) {
  return axios.post(`/signup`, credentials);
}

export default { signup };
