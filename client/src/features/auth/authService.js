import axios from "../../api/axios";

const API_URL = "/";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}user`, userData);
  console.log('response', response)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {

  const response = await axios.post(`${API_URL}user/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.reload()
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;