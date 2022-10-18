import { CompreFace } from "@exadel/compreface-js-sdk";
import React, { useEffect, useRef, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { io } from "socket.io-client";
import { isEmptyArray } from "../../helpers/array";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

const AttendeesList = (props) => {
  const { dataSrc } = props || {};
  return !isEmptyArray(dataSrc) ? (
    <>
      <h1>Attendees List</h1>
      {dataSrc &&
        dataSrc?.map((element, index) => (
          <div key={`${element}-${index}`}>{element}</div>
        ))}
    </>
  ) : (
    <div>nothing to see here </div>
  );
};

const TakeAttendanceFace = (props) => {
  // need to get session id from props?
  const [sessionId, setSessionId] = useState(
    "e58e7759-357f-4fa3-94fc-685611593ec6"
  );
  const [attendees, setAttendees] = useState([]);
  const videoRef = useRef(null);
  const canvas1 = useRef(null);
  let stopRef = useRef(0);

  const core = new CompreFace(
    process.env.REACT_APP_SERVER,
    process.env.REACT_APP_SERVER_PORT
  );
  const recognitionService = core.initFaceRecognitionService(
    process.env.REACT_APP_COMPPREFACE_RECOGNITION_KEY
  );

  useEffect(() => {
    socket.emit("findAllAttendance", {
      sessionId: sessionId,
    });

    socket.on("findAllAttendance", (data) => {
      setAttendees(data);
    });
    socket.on("newAttendance", (data) => {
      setAttendees((prev) => {
        const prevLength = prev?.length;
        if (prevLength === data?.length) return prev;
        else if (prevLength < data?.length) {
          NotificationManager.success(
            `${data.slice(-1)[0]}`,
            "Successfully checked in"
          );
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

          subjects &&
            socket.emit("newAttendance", {
              sessionId: sessionId,
              studentName: subjects[0]?.subject,
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
    await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
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

export default TakeAttendanceFace;
