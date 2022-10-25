import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import BasicTextInput from "../../components/BasicTextInput";
import DropDownList from "../../components/DropDownList";

const Authentication = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().required("REQUIRED"),
    password: yup.string().required("REQUIRED"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:3000/auth/signin`,
        values
      );
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/dashboard");
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <BasicTextInput
          label={"Email"}
          value={formik.values.email}
          onChange={(e) => {
            formik.setFieldValue("email", e.target.value);
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <BasicTextInput
          label={"Password"}
          type="password"
          value={formik.values.password}
          onChange={(e) => {
            formik.setFieldValue("password", e.target.value);
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />
      </div>
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

export default Authentication;
