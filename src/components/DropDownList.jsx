import { FormControl, FormHelperText, Grid, Select } from "@mui/material";
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
    <Grid container spacing={1}>
      <Grid item xs>
        <span
          style={{
            fontSize: "0.75rem",
            lineHeight: "normal",
            textAlign: "right",
          }}
        >
          {title}
        </span>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default DropDownList;
