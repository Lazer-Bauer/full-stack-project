import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();
  console.log(user);
  console.log(children);
  if (user && user.isAdmin) {
    return children;
  }

  return <Navigate to="/sign-in" />;
};
export default IsAdmin;
