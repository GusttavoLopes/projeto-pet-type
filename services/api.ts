import axios from "axios";

const api = axios.create({
  baseURL: "https://api-pet-server.herokuapp.com",
});

export default api;
