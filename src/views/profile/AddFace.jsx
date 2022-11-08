import React, { useState, useEffect } from "react";
import { addSubject } from "../../network/compreface";
import jwt_decode from "jwt-decode";
import { Button, CircularProgress, Box } from "@mui/material";
import { withProtectedRoute } from "../../routes/ProtectedRoute";
import BasicTextInput from "../../components/BasicTextInput";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AddFace = () => {
  const [subject, setSubject] = useState("");
  const [imageFile, setimageFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
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
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.REACT_APP_COMPPREFACE_RECOGNITION_KEY,
        },
      };
      setisUploading(true);
      const response = await axios.patch(
        `http://${process.env.REACT_APP_SERVER_IP}:8000/api/v1/recognition/faces`,
        formData,
        config
      );
      if (response.data.image_id)
        NotificationManager.success("Successfully uploaded image");
    } catch (error) {
      console.log(error);
    } finally {
      setisUploading(false);
    }
  };

  return (
    <div>
      <NotificationContainer />
      <h3>Add Facial Data</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "auto",
          border: "1px solid #C3C3C3",
          borderRadius: "8px",
          padding: "24px 24px 16px 24px",
          width: "fit-content",
        }}
      >
        <BasicTextInput label={"Name:"} disabled value={subject} />

        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setimageFile(e.target.files[0]);
          }}
        />
        <br />
        <Button
          variant="contained"
          onClick={handleSubmit}
          endIcon={
            isUploading && (
              <CircularProgress
                color="inherit"
                size="1rem"
                fontSize="inherit"
                disableShrink
                style={{ marginTop: "13px" }}
              />
            )
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default withProtectedRoute(AddFace);
