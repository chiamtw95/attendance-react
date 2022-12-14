import { Grid } from "@mui/material";
import React from "react";
import { ProtectedRoute } from "../../routes/ProtectedRoute";
import AddFace from "./AddFace";
import ChangePassword from "./ChangePassword";

const ProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <ProtectedRoute restrictedTo="USER">
        <Grid
          container
          spacing={2}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <Grid item sm={12} md={4}>
            <ChangePassword />
          </Grid>
          <Grid item sm={12} md={2}>
            <AddFace />
          </Grid>
        </Grid>
      </ProtectedRoute>

      <ProtectedRoute restrictedTo="ADMIN">
        <ChangePassword />
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
