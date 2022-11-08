import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BasicTextInput from "../../components/BasicTextInput";
import { ACESS_TOKEN } from "../../constant/token";

const Authentication = (props) => {
  const { setisActive } = props;
  const navigate = useNavigate();
  const [error, seterror] = useState("");

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
      try {
        const res = await axios.post(
          `http://${process.env.REACT_APP_SERVER_IP}:3000/auth/signin`,
          values
        );
        localStorage.setItem(ACESS_TOKEN, res.data.access_token);
        setisActive(true);
        navigate("/");
      } catch (error) {
        console.error(error);
        seterror(error.response.data.message);
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
          error={
            (formik.touched.password && Boolean(formik.errors.password)) ||
            error
          }
          helperText={formik.errors.password || error}
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
