import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
