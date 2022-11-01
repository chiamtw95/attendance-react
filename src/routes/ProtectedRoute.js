import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuthVerify } from "./useAuthVerify";

export const ProtectedRoute = (props) => {
  const { restrictedTo, children } = props || {};
  const token = localStorage.getItem("access_token");
  const role = jwt_decode(token).role;
  const isTokenExpired = jwt_decode(token).exp >= Date.now();
  // const useAuthVerify = useAuthVerify();

  if (!token || isTokenExpired) return <Navigate to="/login" />;
  else if (!restrictedTo) return children;
  else if (restrictedTo === role) return children;
};

export const Restricted = (props) => {
  const { restrictedTo, children } = props || {};
  const token = localStorage.getItem("access_token");
  const role = jwt_decode(token).role;
  const isTokenExpired = jwt_decode(token).exp >= Date.now();

  if (!token || isTokenExpired) return <Navigate to="/login" />;
  else if (!restrictedTo) return children;
  else if (restrictedTo === role) return children;
};
