import axios from "axios";

const api = axios.create({
  baseURL: "https://riddle-game-backend.darth-ahsoka.repl.co",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export default api;
