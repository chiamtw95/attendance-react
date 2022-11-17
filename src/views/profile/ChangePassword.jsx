import { Button } from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import BasicTextInput from "../../components/BasicTextInput";
import { withProtectedRoute } from "../../routes/ProtectedRoute";

const ChangePassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [message, setMessage] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const token = localStorage.getItem("access_token");

  const validationSchema = yup.object({
    pw: yup.string().required("REQUIRED"),
    newpw: yup
      .string()
      .required("REQUIRED")
      .oneOf([yup.ref("repeatpw"), null], "Passwords do not match!"),
    repeatpw: yup
      .string()
      .required("REQUIRED")
      .oneOf([yup.ref("newpw"), null], "Passwords do not match!"),
  });
  const formik = useFormik({
    initialValues: {
      pw: "",
      newpw: "",
      repeatpw: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setMessage("");
      seterrmsg("");
      let res;
      try {
        if (isAdmin) {
          res = await axios.post(
            `http://${process.env.REACT_APP_SERVER_IP}:3000/lecturer/passwordchange`,
            { ...values, id }
          );
        } else {
          res = await axios.post(
            `http://${process.env.REACT_APP_SERVER_IP}:3000/student/passwordchange`,
            { ...values, id }
          );
        }
        setMessage(res.data.message);
        formik.resetForm();
      } catch (err) {
        console.error("err");
        seterrmsg(err.response.data.message);
      }
    },
  });

  useEffect(() => {
    const res = jwt_decode(token);
    setName(res.name);
    setEmail(res.email);
    setId(res.sub);
    setIsAdmin(res.role === "ADMIN");
  }, []);

  return (
    <div>
      <h3>Change password</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "auto",
          border: "1px solid #C3C3C3",
          borderRadius: "0.5rem",
          padding: "1rem 1rem",
          width: "fit-content",
        }}
      >
        <BasicTextInput label={"Name"} disabled value={name} />
        <BasicTextInput label={"Email"} disabled value={email} />
        <BasicTextInput
          type="password"
          label={"Current password"}
          value={formik.values.pw}
          onChange={(e) => {
            formik.setFieldValue("pw", e.target.value);
          }}
          error={formik.touched.pw && Boolean(formik.errors.pw)}
          helperText={formik.errors.pw}
        />
        <BasicTextInput
          type="password"
          label={"New password"}
          value={formik.values.newpw}
          onChange={(e) => {
            formik.setFieldValue("newpw", e.target.value);
          }}
          error={formik.touched.newpw && Boolean(formik.errors.newpw)}
          helperText={formik.errors.newpw}
        />
        <BasicTextInput
          type="password"
          label={"Repeat new password"}
          value={formik.values.repeatpw}
          onChange={(e) => {
            formik.setFieldValue("repeatpw", e.target.value);
          }}
          error={formik.touched.repeatpw && Boolean(formik.errors.repeatpw)}
          helperText={formik.errors.repeatpw}
        />
        <br />
        <Button variant="contained" onClick={formik.handleSubmit}>
          Submit
        </Button>
        <h6 style={{ color: "red" }}>{errmsg}</h6>
        <h6 style={{ color: "green" }}>{message}</h6>
      </div>
    </div>
  );
};
export default withProtectedRoute(ChangePassword);
