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
import { ACESS_TOKEN } from "../../constant/token";
import jwtDecode from "jwt-decode";
import { ContactSupport } from "@mui/icons-material";
const AllSubjectsStudent = () => {
  const [subjects, setSubjects] = useState([]);
  const decodedToken = jwtDecode(localStorage.getItem(ACESS_TOKEN));
  const studentId = decodedToken.sub;
  const studentName = decodedToken.name;

  const fetchSubjects = () => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/subject`)
      .then((res) => {
        const r = res.data.map((sub) => {
          return { ...sub };
        });
        setSubjects(r);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const isCurrentlyEnrolled = (data) => {
    return data.name === studentName;
  };

  const handleEnroll = async (subjectId) => {
    const params = { subjectId, studentId };
    const res = await axios.patch(
      `http://${process.env.REACT_APP_SERVER_IP}:3000/subject`,
      params
    );

    fetchSubjects();
  };
  return (
    <div>
      <h1>All Subjects Student</h1>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Subject Code</TableCell>
            <TableCell align="right">Subject Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subjects.map((x, index) => {
            const isEnrolled = x.student.find(isCurrentlyEnrolled);
            return (
              <TableRow
                hover={true}
                key={x.subjectName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{x.subjectCode}</TableCell>
                <TableCell align="right">{x.subjectName}</TableCell>
                <TableCell align="right">
                  <Button
                    disabled={isEnrolled}
                    variant="contained"
                    onClick={() => handleEnroll(x.id)}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
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

export default AllSubjectsStudent;
