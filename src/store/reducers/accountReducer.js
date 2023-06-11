import {
  AUTH,
  LOGOUT,
  GET_PROFILE,
  EDIT_PROFILE,
  GET_ROLES,
} from "../actions/types";

const initialState = {
  authorized: !!localStorage.getItem("jwt"),
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { authorized: true };
    case LOGOUT:
      return { authorized: false };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          fullName: action.payload.fullName,
          birthDate: action.payload.birthDate,
        },
      };
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload.roles,
      };
    default:
      return state;
  }
};

export const authAction = () => ({ type: AUTH });
export const logoutAction = () => ({ type: LOGOUT });
export const getProfileAction = (profile) => ({
  type: GET_PROFILE,
  payload: { profile },
});
export const editProfileAction = (fullName, birthDate) => ({
  type: EDIT_PROFILE,
  payload: { fullName, birthDate },
});
export const getRolesAction = (roles) => ({
  type: GET_ROLES,
  payload: { roles },
});
