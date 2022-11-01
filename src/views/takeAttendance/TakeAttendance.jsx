import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ATTENDANCE } from "../../constant/attendance";
import FacialRecognition from "./FacialRecognition";

const TakeAttendance = () => {
  const { sessionId } = useParams();
  const [mode, setmode] = useState(null);
  return (
    <div
      style={{ display: "grid", direction: "row", justifyContent: "center" }}
    >
      <h1>Take Attendance {sessionId}</h1>
      <h3>Select Mode:</h3>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems="center"
        justifyContent={"center"}
      >
        <Button variant="contained" onClick={() => setmode(ATTENDANCE.FACE)}>
          Face
        </Button>
        <Button variant="contained" onClick={() => setmode(ATTENDANCE.CODE)}>
          Code
        </Button>
      </Stack>
      <Stack mt={2}>
        {mode === ATTENDANCE.FACE && (
          <FacialRecognition sessionId={sessionId} />
        )}
        {mode === ATTENDANCE.CODE && <>code </>}
      </Stack>
    </div>
  );
};

export default TakeAttendance;

/* 
Student => checkinCode

Lecturer 
=> fetch all classes 
~ get sessionID 
~ face or code?
=> lead to face/generate code checkin page
*/
