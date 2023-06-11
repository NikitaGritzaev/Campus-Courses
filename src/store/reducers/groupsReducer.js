import {
  CREATE_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
  GET_GROUPS_FETCH,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  error: false,
  groups: {}
};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS_FETCH:
      return {
        ...initialState,
        loading: true
      }
    case GET_GROUPS_SUCCESS:
      const groups = {};
      action.payload.groups.forEach((group) => (groups[group.id] = group.name));
      return {
        ...initialState,
        groups
      };
    case GET_GROUPS_ERROR:
      return {
        ...initialState,
        error: true
      }
    case CREATE_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group.id]: action.payload.group.name,
        }
      };
    case EDIT_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group.id]: action.payload.group.name,
        }
      };
    case DELETE_GROUP:
      const nextGroups = { ...state.groups };
      delete nextGroups[action.payload.id];
      return {
        ...state,
        groups: nextGroups
      };
    default:
      return state;
  }
};

export const getGroupsSuccessAction = (groups) => ({
  type: GET_GROUPS_SUCCESS,
  payload: { groups },
});
export const getGroupsFetchAction = () => ({
  type: GET_GROUPS_FETCH
});
export const getGroupsErrorAction = () => ({
  type: GET_GROUPS_ERROR
});
export const createGroupAction = (group) => ({
  type: CREATE_GROUP,
  payload: { group },
});
export const editGroupAction = (id, group) => ({
  type: EDIT_GROUP,
  payload: { id, group },
});
export const deleteGroupAction = (id) => ({
  type: DELETE_GROUP,
  payload: { id },
});
