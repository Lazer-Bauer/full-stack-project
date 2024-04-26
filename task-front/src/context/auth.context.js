import { createContext, useContext, useEffect, useState } from "react";
import usersService from "../services/userService";

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
  const storedUser = localStorage.getItem("savedUser");
  const [user, setUser] = useState(!storedUser ? null : JSON.parse(storedUser));
  const [checked, setChecked] = useState("false");
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    refreshUser();
    setAdmin(false);
  }, []);
  const refreshUser = async (u) => setUser(u);
  console.log(refreshUser);
  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    const u = await usersService.getUser();
    await refreshUser(u);
    console.log(user);
    setAdmin(u?.isAdmin);
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
        signUp: usersService.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
