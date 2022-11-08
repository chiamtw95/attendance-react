import { FormHelperText, TextField, Typography, Box } from "@mui/material";

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
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        verticalAlign: "center",
      }}
    >
      <Typography sx={{ paddingRight: "8px" }} variant="h6">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
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
          <FormHelperText style={{ color: "red" }}>{helperText}</FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default BasicTextInput;
