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
    <Grid container spacing={1}>
      <Grid item xs>
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
      <Grid item>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
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
  );
};

export default BasicTextInput;
