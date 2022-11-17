import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CodeAttendanceList = () => {
  const { sessionId } = useParams();
  const [checkedIn, setCheckedIn] = useState([]);
  const [notCheckedIn, setNotCheckedIn] = useState([]);
  const [checkinCode, setCheckInCode] = useState("");

  const fetchAttendance = async () => {
    const res = await axios.get(
      `http://${process.env.REACT_APP_SERVER_IP}:3000/attendance/checkincode/studentList`,
      { params: { sessionId: sessionId } }
    );
    setNotCheckedIn(res.data.notCheckedIn);
    setCheckedIn(res.data.checkedIn);
  };
  useEffect(() => {
    const fetchCheckinCode = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/attendance/checkincode`,
        { params: { sessionId: sessionId } }
      );
      setCheckInCode(res.data.sessionCode);
    };

    fetchAttendance();
    fetchCheckinCode();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchAttendance();
    }, 3000);
  });

  return (
    <>
      <p style={{ fontSize: "1.5rem", verticalAlign: "center" }}>
        <span style={{ fontSize: "1rem" }}>Check in code:&nbsp;</span>
        <b>{checkinCode}</b>
      </p>
      <div style={{ display: "flex" }}>
        <Table
          sx={{ width: "50%", height: "min-content" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Checked in</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {checkedIn?.map((x, index) => {
              return (
                <TableRow
                  hover={true}
                  key={x + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{x}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Table sx={{ width: "50%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Not checked in</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notCheckedIn?.map((x, index) => {
              return (
                <TableRow
                  hover={true}
                  key={x + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{x}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CodeAttendanceList;
