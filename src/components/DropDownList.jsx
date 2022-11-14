import {
  FormControl,
  FormHelperText,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { Fragment } from "react";

const DropDownList = (props) => {
  const {
    title,
    data,
    formik,
    label,
    errorMsg,
    placeholder,
    sxOverride,
  } = props;

  const renderOptions = () => {
    return (
      data &&
      data.map((item, index) => {
        const { value, label } = item || {};
        return (
          <Fragment key={index}>
            <option value={value ?? item}>{label ?? item}</option>
          </Fragment>
        );
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "center",
        ...sxOverride,
      }}
    >
      <Typography sx={{ paddingRight: "8px" }} variant="h6">
        {title}
      </Typography>
      <FormControl variant="outlined">
        <Select
          native
          value={formik && formik.values[label]}
          onChange={formik && formik.handleChange(label)}
          error={
            formik && formik.touched[label] && Boolean(formik.errors[label])
          }
        >
          <option value="">{placeholder}</option>
          {renderOptions()}
        </Select>
        {formik && formik.touched[label] && Boolean(formik.errors[label]) && (
          <FormHelperText error={true}>{errorMsg}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default DropDownList;
