import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import BasicTextInput from "../../components/BasicTextInput";
import DropDownList from "../../components/DropDownList";

const CreateSubject = () => {
  const [lecturer, setLecturers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}:3000/lecturer`).then((res) => {
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
      console.log(values);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}:3000/subject`, values)
        .then((res) => {
          console.log(res);
        });
    },
  });

  return (
    <div>
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
