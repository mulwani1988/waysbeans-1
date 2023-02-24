import { Outlet, Navigate } from "react-router-dom";

export default function CustomerRoute(props) {
  return props.isLogin === true ? <Outlet /> : <Navigate to="/" />;
}