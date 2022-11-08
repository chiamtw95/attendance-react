// import detectionInstance from "./axios/axiosDetectionConfig";
// import axios from "axios";

// /*
// //Image upload to compreface DB endpoint
// */
// export const addSubject = async (formData) => {
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       "x-api-key": `10ca1151-f830-4ce0-ac53-9714c77c3241`,
//     },
//   };

//   return response;
// };

// /*
// //Face recognition endpoint UNTESTED
// */
// export const recognizeFace = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       "x-api-key": `10ca1151-f830-4ce0-ac53-9714c77c3241`,
//     },
//   };

//   const params = {
//     limit: 1,
//   };

//   const response = await recognitionInstance.post(
//     "/recognition/recognize",
//     params,
//     formData,
//     config
//   );

//   return response;
// };

// /*
// //Face detection endpoint UNTESTED
// */
// export const detectFace = async (formData) => {
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       "x-api-key": "79385fad-5a3b-4abb-8b06-ae650e639b95",
//     },
//   };

//   const response = await detectionInstance.post(
//     "/detection/detect",
//     formData,
//     config
//   );

//   return response;
// };
