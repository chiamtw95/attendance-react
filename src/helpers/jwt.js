import { ACESS_TOKEN } from "../constant/token";

export const isTokenExpired = (token) =>
  token?.exp * 1000 <= new Date().valueOf();

export const getToken = () => {
  return localStorage.getItem(ACESS_TOKEN);
};
