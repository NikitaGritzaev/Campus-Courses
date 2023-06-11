import { getUsersAction } from "../../store/reducers/usersReducer";
import { getUsersReq } from "../../api/users";

export const getUsers = () => {
    return async (dispatch) => {
      const response = await getUsersReq();
      dispatch(getUsersAction(response.data));
    };
  };
