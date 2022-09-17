export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () =>
      resolve({ base64: reader.result, fileName: file.name });
    reader.onerror = (error) => reject(error);
  });
};
