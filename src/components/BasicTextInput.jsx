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
    <Grid container>
      <Grid item xs>
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
            label={label}
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
