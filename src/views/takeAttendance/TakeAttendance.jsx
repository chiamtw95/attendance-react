import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ATTENDANCE } from "../../constant/attendance";
import CodeAttendanceList from "./CodeAttendanceList";
import FacialRecognition from "./FacialRecognition";

const TakeAttendance = () => {
  const { sessionId } = useParams();
  const [mode, setmode] = useState(null);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/session`,
        { params: { id: sessionId } }
      );

      setSubjectCode(res.data.subject.subjectCode);
      setSubjectName(res.data.subject.subjectName);
    };
    fetchSubjectDetails();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        padding: "0px 88px",
      }}
    >
      <h1>
        {subjectCode} <br />
        {subjectName}
      </h1>
      {mode === null && (
        <>
          <h3>Select Mode:</h3>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              onClick={() => setmode(ATTENDANCE.FACE)}
            >
              Face
            </Button>
            <Button
              variant="contained"
              onClick={() => setmode(ATTENDANCE.CODE)}
            >
              Code
            </Button>
          </Stack>
        </>
      )}
      <Stack mt={2}>
        {mode === ATTENDANCE.FACE && (
          <FacialRecognition sessionId={sessionId} />
        )}
        {mode === ATTENDANCE.CODE && <CodeAttendanceList />}
      </Stack>
    </div>
  );
};

export default TakeAttendance;
