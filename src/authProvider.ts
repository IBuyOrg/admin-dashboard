import { AuthProvider } from "react-admin";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        number: username,
        password,
      });

      if (data.data.user.type !== "admin") {
        throw new Error("Unauthorized: Only admin users can access this panel");
      }

      localStorage.setItem("auth", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const auth = localStorage.getItem("auth");
    const token = localStorage.getItem("token");
    if (auth && token) {
      const user = JSON.parse(auth);
      if (user.user.type === "admin") {
        return Promise.resolve();
      }
    }
    return Promise.reject();
  },

  getPermissions: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { user } = JSON.parse(auth);
      return Promise.resolve(user.type);
    }
    return Promise.reject();
  },

  getIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { user } = JSON.parse(auth);
      return Promise.resolve({
        id: user.user.id,
        fullName: user.user.name,
      });
    }
    return Promise.reject();
  },
};

export default authProvider;
