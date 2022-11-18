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
        label={label}
        fullWidth
        onChange={onChange}
      />
      {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && (
        <FormHelperText style={{ color: "red" }}>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

export default BasicTextInput;
