import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACESS_TOKEN } from "../../constant/token";
import { withProtectedRoute } from "../../routes/ProtectedRoute";

const Index = () => {
  const token = localStorage?.getItem(ACESS_TOKEN);
  const role = jwtDecode(token)?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    }
  }, []);

  return <div>index</div>;
};

export default withProtectedRoute(Index);

/*
Student 
~ Classes today?
~ Quick checkin
~ Past attendance records

Lecturer
~ Classes today widget that leads to the checkin flow
~ 
 
 */
