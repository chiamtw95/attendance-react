import {
  FormHelperText,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const BasicTextInput = (props) => {
  const {
    label,
    value,
    onChange,
    error,
    helperText,
    showHelperText,
    helperTextStyle,
    ...rest
  } = props || {};

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "flex-start",
    //     justifyContent: "center",
    //     verticalAlign: "center",
    //   }}
    // >
    <Grid container spacing={5}>
      <Grid item xs={2}>
        <span
          style={{
            fontSize: "12px",
            lineHeight: "normal",
            textAlign: "right",
          }}
        >
          {label}
        </span>
      </Grid>
      <Grid item xs={10}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            {...rest}
            size="small"
            variant="outlined"
            value={value}
            onChange={onChange}
          />
          {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && (
            <FormHelperText style={{ color: "red" }}>
              {helperText}
            </FormHelperText>
          )}
        </Box>
      </Grid>
    </Grid>
    // </Box>
  );
};

export default BasicTextInput;
