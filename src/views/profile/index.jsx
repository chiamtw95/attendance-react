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
        <ChangePassword />
        <AddFace />
      </ProtectedRoute>

      <ProtectedRoute restrictedTo="ADMIN">
        <ChangePassword />
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
