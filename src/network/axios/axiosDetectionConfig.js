import axios from "axios";

const detectionInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
detectionInstance.defaults.headers.common["Content-Type"] =
  "multipart/form-data";
detectionInstance.defaults.headers.common["x-api-key"] =
  process.env.REACT_APP_COMPPREFACE_DETECTION_KEY;

export default detectionInstance;
