import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import BasicTextInput from "../../components/BasicTextInput";
import { ACESS_TOKEN } from "../../constant/token";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Register = (props) => {
  const [error, seterror] = useState("");
  const { as } = props;
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email().required("REQUIRED"),
    name: yup.string().required("REQUIRED"),
    password: yup
      .string()
      .required("REQUIRED")
      .oneOf([yup.ref("repeatpw"), null], "Passwords do not match!"),
    repeatpw: yup
      .string()
      .required("REQUIRED")
      .oneOf([yup.ref("password"), null], "Passwords do not match!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      repeatpw: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      let res;
      try {
        if (as === "ADMIN") {
          res = await axios.post(
            `http://${process.env.REACT_APP_SERVER_IP}:3000/lecturer`,
            values
          );
        } else {
          res = await axios.post(
            `http://${process.env.REACT_APP_SERVER_IP}:3000/student`,
            values
          );
        }
        if (res)
          NotificationManager.success("Account successfully registered.");
        formik.resetForm();
      } catch (error) {
        console.error(error);
        seterror(error.response.data.message);
      }
    },
  });

  return (
    <div style={{ marginTop: "12rem", width: "100%", padding: "0px 48px" }}>
      <NotificationContainer />
      <h1 style={{ marginBottom: "24px" }}>
        {as === "ADMIN" ? "Lecturer" : "Student"} Account Registration
        <br />
      </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: "64px",
          }}
        >
          <BasicTextInput
            label={"Name"}
            value={formik.values.name}
            onChange={(e) => {
              formik.setFieldValue("name", e.target.value);
            }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />
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
            error={
              (formik.touched.password && Boolean(formik.errors.password)) ||
              error
            }
            helperText={formik.errors.password}
          />
          <BasicTextInput
            label={"Repeat password"}
            type="password"
            value={formik.values.repeatpw}
            onChange={(e) => {
              formik.setFieldValue("repeatpw", e.target.value);
            }}
            error={
              (formik.touched.repeatpw && Boolean(formik.errors.repeatpw)) ||
              error
            }
            helperText={formik.errors.repeatpw || error}
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => formik.handleSubmit()}
          >
            Submit
          </Button>
          <Link to="/" style={{ marginTop: "24px" }}>
            Back to login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
