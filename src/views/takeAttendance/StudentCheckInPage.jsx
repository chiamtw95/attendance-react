import React, { useState } from "react";
import BasicTextInput from "../../components/BasicTextInput";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ACESS_TOKEN } from "../../constant/token";
import { Button } from "@mui/material";

const StudentCheckInPage = () => {
  const decodedToken = jwtDecode(localStorage.getItem(ACESS_TOKEN));
  const studentId = decodedToken.sub;
  const [message, setmessage] = useState("");

  const validationSchema = yup.object({
    checkInCode: yup
      .string()
      .required("REQUIRED")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(10, "Please enter a valid code"),
  });

  const formik = useFormik({
    initialValues: {
      checkInCode: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const res = await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/session/checkin`,
        { ...values, studentId }
      );
      setmessage(res?.data?.message);
      formik.resetForm();
    },
  });
  return (
    <di>
      <h1>Welcome! </h1>
      <h2>Please enter check in code to mark your attendance.</h2>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "auto",
          border: "1px solid #C3C3C3",
          borderRadius: "8px",
          padding: "24px 48px 16px 24px",
          width: "fit-content",
        }}
      >
        <BasicTextInput
          label={"Check in code: "}
          value={formik.values.checkInCode}
          onChange={(e) => {
            formik.setFieldValue("checkInCode", e.target.value);
          }}
          error={
            formik.touched.checkInCode && Boolean(formik.errors.checkInCode)
          }
          helperText={formik.errors.checkInCode}
        />
        <Button variant="contained" onClick={formik.handleSubmit}>
          Submit
        </Button>
        <small>{message}</small>
      </div>
    </di>
  );
};

export default StudentCheckInPage;
