import axios from "axios";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";
export async function registerUser(details) {
  return axios.post("http://localhost:5000/tasks/users", details);
}

export async function login(values) {
  const response = await axios.post(
    "http://localhost:5000/tasks/users/login",
    values
  );

  localStorage.setItem(TOKEN_KEY, response.data.token);
  //await getUser();
  console.log(response.data);
  refreshTokenHeader();
  return response;
}
export async function getAllUsers() {
  const response = await axios.get("http://localhost:5000/tasks/users");

  console.log(mapUserResponse(response.data));
  return mapUserResponse(response.data);
}
function mapUserResponse(users) {
  return users.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      id: user._id,
    };
  });
}

export function setCommonHeader(headerName, headerValue) {
  axios.defaults.headers.common[headerName] = headerValue;
}
export function refreshTokenHeader() {
  setCommonHeader("x-auth-token", getJWT());
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function getUser() {
  try {
    console.log(1);
    refreshTokenHeader();
    const storedUser = localStorage.getItem("savedUser");
    if (storedUser) return JSON.parse(storedUser);
    console.log(2);
    const token = getJWT();
    if (!token) return;
    const deCodedUser = jwtDecode(token);
    console.log(3);
    console.log(deCodedUser);
    const response = await axios.get(
      `http://localhost:5000/tasks/users/${deCodedUser._id}`
    );
    console.log(4);
    localStorage.setItem("savedUser", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  refreshTokenHeader();
  localStorage.removeItem("savedUser");
}

const usersService = {
  registerUser,
  login,
  logout,
  getUser,
  getJWT,
  getAllUsers,
};

export default usersService;
