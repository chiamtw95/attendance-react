import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const SessionsList = () => {
  const [details, setDetails] = useState({});
  const [subjectName, setsubjectName] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [sessions, setsessions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //FETCH ALL SESSIONS FOR THIS SUB,
    // CREATE NEW >  face/code
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/subject/details`, {
        params: { id },
      })
      .then((res) => {
        console.log(res.data);
        setsubjectName(res.data.subjectName);
        setsubjectCode(res.data.subjectCode);
        setsessions(res.data.sessions);
        setDetails(res.data);
      });
  }, []);
  return (
    <div>
      <h1>
        {subjectCode}
        <br />
        {subjectName}
      </h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Session ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sessions.map((x, index) => {
            const date = new Date(x.date);

            return (
              <TableRow
                key={x.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{x.id}</TableCell>
                <TableCell align="right">
                  {date.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(`/attendance/takeAttendance/${x.id}`)
                    }
                  >
                    Take Attendance
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionsList;
