import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.190.10.20:3003/api",
});

/* Local Instance */
// "http://localhost:3001/api"

export default axiosInstance;
