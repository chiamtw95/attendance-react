import axios from "axios";

const recognitionInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
    "x-api-key": `10ca1151-f830-4ce0-ac53-9714c77c3241`,
  },
  data: {},
});

export default recognitionInstance;
