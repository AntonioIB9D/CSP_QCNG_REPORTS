import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

/* Local Instance */
// "http://localhost:3000/api"

export default axiosInstance;
