import React, { useState } from "react";
import { addSubject } from "../network/compreface";

const AddFace = () => {
  const [subject, setSubject] = useState("");
  const [imageFile, setimageFile] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("subject", subject);
    const res = await addSubject(formData);
    console.log(res);
  };

  return (
    <>
      <h1>Add Face Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject Name:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <br />
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setimageFile(e.target.files[0]);
          }}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};
export default AddFace;
