import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACESS_TOKEN } from "../constant/token";

export const useAuthVerify = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACESS_TOKEN);

    if (token) {
      const decodedJwt = jwtDecode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem(ACESS_TOKEN);
        navigate("/login");
      }
    }
  }, [location]);
};
