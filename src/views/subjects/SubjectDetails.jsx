import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDownList from "../../components/DropDownList";
import { useFormik } from "formik";
import * as yup from "yup";
import ArrowBack from "../../components/ArrowBack";

const SubjectDetails = () => {
  const { id } = useParams();
  const [lect, setlect] = useState("");
  const [subcode, setsubcode] = useState("");
  const [subname, setsubname] = useState("");
  const [students, setstudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    const fetchSubjectData = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/subject/details`,
        { params: { id } }
      );
      setsubname(res?.data?.subjectName);
      setsubcode(res?.data?.subjectCode);
      setlect(res?.data?.lecturer[0]?.name);
      setstudents(res?.data?.student);
    };

    const fetchDropdownData = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/subject/studentsenroll`,
        { params: { id } }
      );
      const filteredRes = res.data.map((x) => x.name);
      setAvailableStudents(filteredRes);
    };
    fetchSubjectData();
    fetchDropdownData();
  };

  useEffect(() => {
    if (!isAddingStudent) {
      fetchData();
    }
  }, []);

  const validationSchema = yup.object({
    student: yup.mixed().oneOf(availableStudents).required("REQUIRED"),
  });

  const formik = useFormik({
    initialValues: {
      student: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/subject/studentsenroll`,
        { ...values, id }
      );
      setIsAddingStudent(false);
      fetchData();
    },
  });

  const handleRemove = async (studentName) => {
    await axios.put(
      `http://${process.env.REACT_APP_SERVER_IP}:3000/subject/studentsenroll`,
      { id, studentName }
    );
    fetchData();
  };

  return (
    <div>
      <ArrowBack navigateTo="/subjects" />
      <h1>Subject Details</h1>
      <h1>
        SubjectName: {subcode} {subname}
      </h1>
      <h1>Lecturer: {lect}</h1>

      <div
        style={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: "50%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <h3>Student Name</h3>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((x, index) => {
              return (
                <TableRow
                  key={x?.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: "1px" },
                  }}
                >
                  <TableCell align="left">{x?.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => handleRemove(x?.name)}
                    >
                      Remove{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell align="right">
                {isAddingStudent && (
                  <DropDownList
                    data={availableStudents}
                    placeholder={"Select student"}
                    label="student"
                    formik={formik}
                    errorMsg="REQUIRED"
                    sxOverride={{ justifyContent: "flex-start" }}
                  />
                )}
              </TableCell>
              <TableCell align="right">
                {!isAddingStudent ? (
                  <Button onClick={() => setIsAddingStudent(true)}>
                    Add Student
                  </Button>
                ) : (
                  <Button onClick={formik.handleSubmit}>Submit</Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectDetails;
