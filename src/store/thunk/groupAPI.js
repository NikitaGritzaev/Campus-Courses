import {
  getGroupsFetchAction,
  getGroupsSuccessAction,
  getGroupsErrorAction,
  createGroupAction,
  editGroupAction,
  deleteGroupAction,
} from "../../store/reducers/groupsReducer";
import {
  getGroupsReq,
  createGroupReq,
  editGroupReq,
  deleteGroupReq,
} from "../../api/groups";

export const getGroups = () => {
  return async (dispatch) => {
    dispatch(getGroupsFetchAction());
    try {
      const response = await getGroupsReq();
      const groups = response.data;
      dispatch(getGroupsSuccessAction(groups));
    }
    catch {
      dispatch(getGroupsErrorAction());
    }
  };
};

export const createGroup = (name) => {
  return async (dispatch) => {
    const response = await createGroupReq(name);
    const group = response.data;
    dispatch(createGroupAction(group));
  };
};

export const editGroup = (id, name) => {
  return async (dispatch) => {
    const response = await editGroupReq(id, name);
    const group = response.data;
    dispatch(editGroupAction(id, group));
  };
};

export const deleteGroup = (id) => {
  return async (dispatch) => {
    const response = await deleteGroupReq(id);
    const group = response.data;
    dispatch(deleteGroupAction(id, group));
  };
};
