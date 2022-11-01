import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
const AllSubjectsStudent = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    // SHOULD FETCH ENROLLED SUBS ONLY
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/subject`)
      .then((res) => {
        const r = res.data.map((sub) => {
          return { ...sub };
        });
        setSubjects(r);
      });
  }, []);
  return (
    <div>
      <h1>All Subjects Student</h1>
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
                  <Button variant="contained">Enroll</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllSubjectsStudent;
