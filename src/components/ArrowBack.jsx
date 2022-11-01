import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const ArrowBack = (props) => {
  const { navigateTo } = props;
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <IconButton
        onClick={() => navigate(navigateTo)}
        children={<ArrowBackIcon />}
      />
    </div>
  );
};

export default ArrowBack;
