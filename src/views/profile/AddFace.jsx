import React, { useState, useEffect } from "react";
import { addSubject } from "../../network/compreface";
import jwt_decode from "jwt-decode";
import { Button } from "@mui/material";

const AddFace = () => {
  const [subject, setSubject] = useState("");
  const [imageFile, setimageFile] = useState({});
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const res = jwt_decode(token);
    setSubject(res.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("subject", subject);
    const res = await addSubject(formData);
    // TODO add notidication banner upload succesffull
  };

  return (
    <>
      <h1>Add Face Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject Name:</label>
        <input
          type="text"
          id="subject"
          disabled
          name="subject"
          value={subject}
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
};
export default AddFace;
