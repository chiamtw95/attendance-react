import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useCompreFace } from "../effects/useCompreFace";
import { CompreFace } from "@exadel/compreface-js-sdk";
import { isEmptyArray } from "../helpers/array";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
  //   auth: {
  //     token: "123",
  //   },
  //   query: {
  //     "my-key": "my-value",
  //   },
});

const AttendeesList = (props) =>{
  const {dataSrc} = props || {};
    return !isEmptyArray(dataSrc)?  (<>{dataSrc&& dataSrc?.map((element) =>  <div>{element}</div>)}</> ): <div>nothing to see here </div>
}


const TakeAttendanceFace = () => {
  const [attendees, setAttendees] = useState([]);
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const videoRef = useRef(null);
  const canvas1 = useRef(null);
  let stopRef = useRef(0);
  let receivedMediaStream = null;
  // const server = "http://localhost";
  // const port = 8000;
  // const DETECTIONKEY = "79385fad-5a3b-4abb-8b06-ae650e639b95";
  // const RECOGNITIONKEY = `10ca1151-f830-4ce0-ac53-9714c77c3241`;
  const core = new CompreFace(process.env.REACT_APP_SERVER, process.env.REACT_APP_SERVER_PORT);
  // const detection_service = core.initFaceDetectionService(DETECTIONKEY);
  const detection_service = core.initFaceDetectionService(process.env.REACT_APP_DETECTIONKEY);
  const recognitionService = core.initFaceRecognitionService(process.env.REACT_APP_RECOGNITIONKEY);

  useEffect(() => {
    if (isTakingAttendance === true && videoRef && canvas1) {
      setTimeout(fetchLoop, 3000);
    }
  }, [isTakingAttendance, videoRef, canvas1]);

  const fetchLoop = async () => {
    try {
      let ctx1 = canvas1.current.getContext("2d");
      await ctx1.drawImage(videoRef.current, 0, 0, 640, 480);
      var dataURL = canvas1.current.toDataURL("image/jpeg", 0.95);
      await canvas1.current.toBlob(
        async (blob) => {
          const res = await recognitionService.recognize(blob, { limit: 1 });
          console.log(res);
        },
        "image/jpeg",
        0.95
      );
      if (stopRef.current === 0) {
        setTimeout(fetchLoop, 3000);
      }
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
        receivedMediaStream = stream;
      })
      .catch((err) => console.error("startCam error", err));
    setIsTakingAttendance(true);
  };

  const closeCam = () => {
    setIsTakingAttendance(false);
    stopRef = stopRef.current + 1;
  };

  return (
    <>
      <div className="TakeAttendanceFace">
        <div className="videoWrapper">
          div for face
          <video ref={videoRef} autoPlay muted></video>
          <canvas
            ref={canvas1}
            width="640"
            id="canvas"
            height="480"
            style={{ display: "none" }}
          ></canvas>
        </div>
        <div className="attendeesListWrapper">div for students<AttendeesList dataSrc={attendees} /></div>
      </div>
      <button onClick={() => startCam()}>Start taking attendance</button>
      <button red={stopRef} onClick={() => closeCam()}>
        stop
      </button>
    </>
  );
};

export default TakeAttendanceFace;

/* 
upon loading, connect websocket 
sessionID, lecturerID, fetchall students that have atttended? , 

Connect to compreface => get attendance as users checkin => pass student name to attendance backend (student name, sessionID)

*/
