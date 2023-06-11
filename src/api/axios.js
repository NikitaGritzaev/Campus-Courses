import axios from "axios";
import { store } from "./../store/store";
import validateJwt from "../utils/jwt";
import { logoutAction } from "../store/reducers/accountReducer";
const instance = axios.create({
  baseURL: "https://camp-courses.api.kreosoft.space",
  headers: {
    Authorization: validateJwt(),
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = validateJwt();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  }
);

export default instance;
