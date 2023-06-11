import {
  DELETE_COURSE,
  COURSE_SIGN_UP,
  CHANGE_COURSE,
  GET_COURSE_DETAILS_SUCCESS,
  GET_COURSE_DETAILS_ERROR,
  GET_COURSE_DETAILS_FETCH,
} from "../actions/types";

const initialState = {
  loading: false,
  error: false,
  details: {},
};
export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_DETAILS_FETCH:
      return {
        ...initialState,
        loading: true,
      };
    case GET_COURSE_DETAILS_SUCCESS:
      const role = getUserCourseRoles(
        action.payload.account,
        action.payload.details
      );
      let students = action.payload.details.students.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
      return {
        ...initialState,
        details: {
          ...action.payload.details,
          students,
          role,
        },
      };
    case GET_COURSE_DETAILS_ERROR:
      return {
        ...initialState,
        error: true,
      };
    case CHANGE_COURSE:
      let studentsChange = action.payload.details.students.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
      return {
        ...initialState,
        details: {
          ...action.payload.details,
          students: studentsChange,
          role: state.details.role,
        },
      };
    case COURSE_SIGN_UP:
      return {
        ...initialState,
        details: {
          ...state.details,
          studentsInQueueCount: state.details.studentsInQueueCount + 1,
          role: {
            status: "student",
          },
        },
      };
    default:
      return state;
  }
};

const getUserCourseRoles = (account, courseData) => {
  if (!account || !courseData || !Object.keys(courseData).length) return null;
  for (let student of courseData.students) {
    if (account.profile.email === student.email) {
      return {
        status: "student",
        ...student,
      };
    }
  }
  for (let teacher of courseData.teachers) {
    if (account.profile.email === teacher.email) {
      return {
        status: "teacher",
        ...teacher,
      };
    }
  }
  return {
    status: null,
  };
};

export const getCourseDetailsFetchAction = () => ({
  type: GET_COURSE_DETAILS_FETCH,
});

export const getCourseDetailsSuccessAction = (id, details, account) => ({
  type: GET_COURSE_DETAILS_SUCCESS,
  payload: {
    id,
    details,
    account,
  },
});

export const getCourseDetailsErrorAction = () => ({
  type: GET_COURSE_DETAILS_ERROR,
});

export const changeCourseAction = (details) => ({
  type: CHANGE_COURSE,
  payload: {
    details,
  },
});
export const deleteCourseAction = () => ({
  type: DELETE_COURSE,
});
export const signUpCourseAction = () => ({
  type: COURSE_SIGN_UP,
});
