import { CompreFace } from "@exadel/compreface-js-sdk";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { isEmptyArray } from "../../helpers/array";

const AttendeesList = (props) => {
  const { dataSrc } = props || {};

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <h2>Attendees</h2>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {dataSrc &&
            dataSrc?.map((element, index) => (
              <TableCell key={`${element}-${index}`} align="center">
                {element}
              </TableCell>
            ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

const FacialRecognition = (props) => {
  const { sessionId } = props;
  const socket = io(`ws://${process.env.REACT_APP_SERVER_IP}:3000`, {
    reconnectionDelayMax: 10000,
  });
  socket.on("connect", () => {
    socket.emit("joinRoom", { roomName: sessionId });
    socket.emit("findAllAttendance", {
      sessionId: sessionId,
    });
  });

  const [attendees, setAttendees] = useState([]);
  const videoRef = useRef(null);
  const canvas1 = useRef(null);
  let stopRef = useRef(0);

  const core = new CompreFace(
    `http://${process.env.REACT_APP_SERVER_IP}`,
    process.env.REACT_APP_SERVER_PORT
  );
  const recognitionService = core.initFaceRecognitionService(
    process.env.REACT_APP_COMPPREFACE_RECOGNITION_KEY
  );

  useEffect(() => {
    socket.on("findAllAttendance", (data) => {
      console.log("findall", data);
      setAttendees(data);
    });
    socket.on("newAttendance", (data) => {
      console.log("newattendance", data);
      setAttendees((prev) => {
        const prevLength = prev?.length;
        if (prevLength === data?.length) return prev;
        else if (prevLength < data?.length) {
          const currAttendee = data.filter((x) => !prev.includes(x));
          NotificationManager.success(
            `${currAttendee}`,
            "Successfully checked in"
          );
          return data;
        } else {
          return data;
        }
      });
    });
  }, []);

  const fetchLoop = async () => {
    if (stopRef.current === 1) return;
    try {
      let ctx1 = canvas1.current.getContext("2d");
      await ctx1.drawImage(videoRef.current, 0, 0, 640, 480);
      await canvas1.current.toBlob(
        async (blob) => {
          const res = await recognitionService.recognize(blob, { limit: 1 });
          const { result } = res;
          const { subjects } = result[0];
          const { subject, similarity } = subjects[0];

          subject &&
            similarity > 0.7 &&
            socket.emit("newAttendance", {
              sessionId: sessionId,
              studentName: subject,
            });
        },
        "image/jpeg",
        0.95
      );
      setTimeout(fetchLoop, 3000);
    } catch (err) {
      if (err?.response?.status === 400) setTimeout(fetchLoop, 3000);
      console.error(err);
    }
  };

  const startCam = async () => {
    stopRef.current = 0;
    await navigator?.mediaDevices
      ?.getUserMedia({ video: true })
      ?.then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("startCam error", err));
    setTimeout(fetchLoop, 3000);
  };

  const closeCam = async () => {
    stopRef.current = 1;
    videoRef.current.srcObject.getTracks()[0].stop();
  };

  return (
    <>
      <NotificationContainer />
      <div className="TakeAttendanceFace">
        <div className="videoWrapper">
          <video ref={videoRef} autoPlay muted></video>
          <canvas
            ref={canvas1}
            width="640"
            id="canvas"
            height="480"
            style={{ display: "none" }}
          ></canvas>
          <div>
            <button onClick={() => startCam()}>Start taking attendance</button>
            <button red={stopRef} onClick={() => closeCam()}>
              stop
            </button>
          </div>
        </div>
        <div className="attendeesListWrapper">
          <AttendeesList dataSrc={attendees} />
        </div>
      </div>
    </>
  );
};

export default FacialRecognition;
