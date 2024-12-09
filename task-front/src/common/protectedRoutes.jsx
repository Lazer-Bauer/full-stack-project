import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  console.log(children);
  return children;
};
export default ProtectedRoute;
