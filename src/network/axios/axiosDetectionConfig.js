import axios from "axios";

const detectionInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
detectionInstance.defaults.headers.common["Content-Type"] =
  "multipart/form-data";
detectionInstance.defaults.headers.common["x-api-key"] =
  "79385fad-5a3b-4abb-8b06-ae650e639b95";

export default detectionInstance;
