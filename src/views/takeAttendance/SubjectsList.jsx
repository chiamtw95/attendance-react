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
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("access_token");
  const id = jwtDecode(token).sub;
  const navigate = useNavigate();

  useEffect(() => {
    // SHOULD FETCH ENROLLED SUBS ONLY
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/subject/lect`, {
        params: { id },
      })
      .then((res) => {
        const r = res.data.subject.map((sub) => {
          return { ...sub };
        });
        setSubjects(r);
      });
  }, []);
  return (
    <div>
      <h1>All Subjects</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Subject Code</TableCell>
            <TableCell align="right">Subject Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subjects.map((x, index) => {
            return (
              <TableRow
                key={x.subjectName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{x.subjectCode}</TableCell>
                <TableCell align="right">{x.subjectName}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/attendance/sessions/${x.id}`)}
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

export default SubjectList;
