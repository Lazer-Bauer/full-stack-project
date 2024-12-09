import { createContext, useContext, useEffect, useState } from "react";
import usersService from "../services/userService";
import { getJobByUserId } from "../services/JobServices";
const fn_error_context_must_be_used = () => {
  throw new Error("must use authContext provider for consumer to work");
};
export const authContext = createContext({
  user: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
});
authContext.displayName = "auth";
export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("savedUser")
    ? JSON.parse(localStorage.getItem("savedUser"))
    : null;
  const [user, setUser] = useState(storedUser);
  const [checked, setChecked] = useState("false");
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (storedUser) {
      setAdmin(storedUser.isAdmin || false); // Add fallback to `false`
      console.log(storedUser, "isAdmin");
    }
  }, []);

  const refreshUser = async (u) => setUser(u);
  console.log(refreshUser);
  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    const u = await usersService.getUser();
    await refreshUser(u);
    console.log(user);
    setAdmin(u?.isAdmin);
    const jobResponse = await getJobByUserId(u._id);
    console.log(jobResponse);
    setJobs(jobResponse.data);
    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        checked,
        setChecked,
        search,
        setSearch,
        admin,
        jobs,
        setJobs,
        signUp: usersService.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
