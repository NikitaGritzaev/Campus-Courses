import { GET_USERS } from "../actions/types";

const initialState = [];

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return action.payload.users;
        default:
            return state;
    } 
}

export const getUsersAction = (users) => ({type: GET_USERS, payload: { users } });
