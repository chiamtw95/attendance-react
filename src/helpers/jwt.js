export const isTokenExpired = (token) =>
  token?.exp * 1000 <= new Date().valueOf();
