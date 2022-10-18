import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import BasicTextInput from "../../components/BasicTextInput";
import DropDownList from "../../components/DropDownList";
import { Button } from "@mui/material";

const CreateSubject = () => {
  // TOOD: fetch lecturer for dropdownlist

  const lec = [
    { value: "ah Hock", label: "Ah Hock" },
    { value: "ali", label: "Ali" },
  ];
  const validateSamplesLec = lec.map((x) => x.value);

  const validationSchema = yup.object({
    subjectName: yup.string().required("REQUIRED"),
    subjectCode: yup.string().required("REQUIRED"),
    lecturer: yup.mixed().oneOf(validateSamplesLec).required("REQUIRED"),
  });
  const formik = useFormik({
    initialValues: {
      subjectName: "",
      subjectCode: "",
      lecturer: "",
    },
    validationSchema,
    validateOnBlur: true,
    // onSubmit: async (values) => {
    //   const { buildingType, address1, city, state, postcode } = values || {};
    //   });
    //   setCurrentStep((prevState) => prevState + 1);
    // },
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
        data={lec}
        label="lecturer"
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
