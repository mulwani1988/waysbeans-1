import { Outlet, Navigate } from "react-router-dom";

export default function AdminRoute(props) {
  return props.isLogin === true && props.isAdmin === true ? <Outlet /> : <Navigate to="/" />;
}