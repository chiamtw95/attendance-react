import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import BasicTextInput from "../../components/BasicTextInput";
import DropDownList from "../../components/DropDownList";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../components/ArrowBack";

const CreateSubject = () => {
  const [lecturer, setLecturers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/lecturer`)
      .then((res) => {
        const r = res.data.map((lec) => lec.name);
        setLecturers(r);
      });
  }, []);

  const validationSchema = yup.object({
    subjectName: yup.string().required("REQUIRED"),
    subjectCode: yup.string().required("REQUIRED"),
    lecturerName: yup.mixed().oneOf(lecturer).required("REQUIRED"),
  });
  const formik = useFormik({
    initialValues: {
      subjectName: "",
      subjectCode: "",
      lecturerName: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `http://${process.env.REACT_APP_SERVER_IP}:3000/subject`,
          values
        );
        if (res?.status === 201) {
          formik.resetForm();
          setError(null);
        }
      } catch (error) {
        console.log("hahah;", error);
        if (error.response) {
          setError(error.response.data.message);
          console.error(error.response.status);
        }
      }
    },
  });
  return (
    <div>
      <ArrowBack navigateTo="/subjects" />
      <h1>Create Subject</h1>
      <BasicTextInput
        label={"Subject Name"}
        value={formik.values.subjectName}
        onChange={(e) => {
          formik.setFieldValue("subjectName", e.target.value);
        }}
        error={formik.touched.subjectName && Boolean(formik.errors.subjectName)}
        helperText={formik.errors.subjectName}
      />
      <BasicTextInput
        label={"Subject Code"}
        value={formik.values.subjectCode}
        onChange={(e) => {
          formik.setFieldValue("subjectCode", e.target.value);
        }}
        error={formik.touched.subjectCode && Boolean(formik.errors.subjectCode)}
        helperText={formik.errors.subjectCode}
      />
      <DropDownList
        title={"Select lecturer"}
        placeholder={"Select lecturer"}
        data={lecturer}
        label="lecturerName"
        formik={formik}
        errorMsg="REQUIRED"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button
        variant="contained"
        size="large"
        onClick={() => formik.handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateSubject;
