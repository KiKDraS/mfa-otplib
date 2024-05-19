import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "./route";

const CheckAuth = () => {
  const { checkAuth } = useContext(AuthContext);

  return (
    <>{checkAuth() ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.SIGNIN} />}</>
  );
};
export default CheckAuth;
