import {
  authAction,
  logoutAction,
  editProfileAction,
  getRolesAction,
  getProfileAction,
} from "./../../store/reducers/accountReducer";
import {
  registrationReq,
  loginReq,
  logoutReq,
  getProfileReq,
  editProfileReq,
} from "../../api/account";
import { getRolesReq } from "../../api/users";

export const registration = (
  fullName,
  birthDate,
  email,
  password,
  confirmPassword
) => {
  return async (dispatch) => {
    const response = await registrationReq(
      fullName,
      birthDate,
      email,
      password,
      confirmPassword
    );
    const token = response.data.token;
    localStorage.setItem("jwt", token);
    dispatch(authAction(response.data));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await loginReq(email, password);
    const token = response.data.token;
    localStorage.setItem("jwt", token);
    dispatch(authAction(response.data));
  };
};

export const logout = () => {
  return async (dispatch) => {
    await logoutReq();
    localStorage.removeItem("jwt");
    dispatch(logoutAction());
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    const response = await getProfileReq();
    dispatch(getProfileAction(response.data));
  };
};

export const editProfile = (fullName, birthDate) => {
  return async (dispatch) => {
    const response = await editProfileReq(fullName, birthDate);
    dispatch(
      editProfileAction(response.data.fullName, response.data.birthDate)
    );
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    const response = await getRolesReq();
    const roles = response.data;
    dispatch(getRolesAction(roles));
  };
};
