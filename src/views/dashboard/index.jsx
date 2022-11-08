import React from "react";
import { withProtectedRoute } from "../../routes/ProtectedRoute";

const index = () => {
  return <div>index</div>;
};

export default withProtectedRoute(index);

/*
Student 
~ Classes today?
~ Quick checkin
~ Past attendance records

Lecturer
~ Classes today widget that leads to the checkin flow
~ 
 
 */
