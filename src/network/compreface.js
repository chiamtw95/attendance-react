import detectionInstance from "./axios/axiosDetectionConfig";
import recognitionInstance from "./axios/axiosRecognitionConfig";

/*
//Image upload to compreface DB endpoint
*/
export const addSubject = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": `10ca1151-f830-4ce0-ac53-9714c77c3241`,
    },
  };

  const response = await recognitionInstance.post(
    `/recognition/faces`,
    formData,
    config
  );

  return response;
};

/*
//Face recognition endpoint UNTESTED
*/
export const recognizeFace = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": `10ca1151-f830-4ce0-ac53-9714c77c3241`,
    },
  };

  const params = {
    limit: 1,
  };

  const response = await recognitionInstance.post(
    "/recognition/recognize",
    params,
    formData,
    config
  );

  return response;
};

/*
//Face detection endpoint UNTESTED
*/
export const detectFace = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await detectionInstance.post("/detection/detect", formData);

  return response;
};
