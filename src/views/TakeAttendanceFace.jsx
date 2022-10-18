import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useCompreFace } from "../effects/useCompreFace";
import { CompreFace } from "@exadel/compreface-js-sdk";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
  //   auth: {
  //     token: "123",
  //   },
  //   query: {
  //     "my-key": "my-value",
  //   },
});

const TakeAttendanceFace = () => {
  const [attendees, setAttendees] = useState([]);
  const [isTakingAttendance, setIsTakingAttendance] = useState(true);
  const videoRef = useRef(null);
  const canvas1 = useRef(null);
  let receivedMediaStream = null;
  const nextFrameEvent = new Event("next_frame", {
    bubbles: true,
    cancelable: true,
  });

  const startCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        receivedMediaStream = stream;
      })
      .catch((err) => console.error("startCam error", err));

    videoRef.current.addEventListener("play", () => {
      const server = "http://localhost";
      const port = 8000;
      const detection_key = "79385fad-5a3b-4abb-8b06-ae650e639b95";
      const core = new CompreFace(server, port);
      const detection_service = core.initFaceDetectionService(detection_key);
      let ctx1 = canvas1.current.getContext("2d");

      document.addEventListener("next_frame", () => {
        if (!isTakingAttendance) return;
        ctx1.drawImage(videoRef.current, 0, 0, 640, 480);
        // const imageBlob = canvas1.current.toBlob(
        //   (blob) => {
        detection_service
          .detect()
          .then((res) => {
            console.log(res);
            document.dispatchEvent(nextFrameEvent);
          })
          .catch((error) => {
            console.log("error with blob", error.response);
          })
          .then((res) => {
            document.dispatchEvent(nextFrameEvent);
          });
        //   },
        //   "image/jpeg",
        //   0.95
        // );
      });

      document.dispatchEvent(nextFrameEvent);
    });
  };

  const closeCam = () => {
    setIsTakingAttendance(false);
    receivedMediaStream.getTracks().forEach((mediaTrack) => {
      mediaTrack.stop();
      videoRef.srcObject = null;
      canvas1.srcObject = null;
    });
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
        <div>div for students</div>
      </div>
      <button onClick={() => startCam()}>Start taking attendance</button>
      <button onClick={() => closeCam()}>stop</button>
    </>
  );
};

export default TakeAttendanceFace;

/* 
upon loading, connect websocket 
sessionID, lecturerID, fetchall students that have atttended? , 

Connect to compreface => get attendance as users checkin => pass student name to attendance backend (student name, sessionID)

*/
