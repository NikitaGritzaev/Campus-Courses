import {
  GET_COURSES_LIST_FETCH,
  GET_COURSES_LIST_SUCCESS,
  GET_COURSES_LIST_ERROR,
  CREATE_COURSE
} from "../actions/types";

const initialState = {
  loading: false,
  error: false,
  courses: [],
};

export const coursesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES_LIST_FETCH:
      return {
        ...initialState,
        loading: true,
      };
    case GET_COURSES_LIST_SUCCESS:
      return {
        ...initialState,
        courses: action.payload.courses,
      };
    case GET_COURSES_LIST_ERROR:
      return {
        ...initialState,
        error: true,
      };
      case CREATE_COURSE:
        return {
          ...initialState,
          courses: action.payload.course,
        };
    default:
      return state;
  }
};

export const getCoursesListFetchAction = () => ({
  type: GET_COURSES_LIST_FETCH,
});

export const getCoursesListSuccessAction = (courses) => ({
  type: GET_COURSES_LIST_SUCCESS,
  payload: {
    courses,
  },
});

export const getCoursesListErrorAction = () => ({
  type: GET_COURSES_LIST_ERROR,
});

export const createCourseAction = (course) => ({
  type: CREATE_COURSE,
  payload: {course}
});
