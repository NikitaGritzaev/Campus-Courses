import {
  getCoursesListFetchAction,
  getCoursesListSuccessAction,
  getCoursesListErrorAction,
} from "../../store/reducers/coursesListReducer";
import { getMyCoursesReq, getTeachingCoursesReq } from "../../api/courses";
import { getGroupCoursesReq } from "../../api/groups";

export const getGroupCourses = (id) => {
  return async (dispatch) => {
    dispatch(getCoursesListFetchAction());
    try {
      const response = await getGroupCoursesReq(id);
      const courses = response.data;
      dispatch(getCoursesListSuccessAction(courses));
    } catch {
      dispatch(getCoursesListErrorAction());
    }
  };
};

export const getMyCourses = () => {
  return async (dispatch) => {
    dispatch(getCoursesListFetchAction());
    try {
      const my = await getMyCoursesReq();
      dispatch(getCoursesListSuccessAction(my.data));
    } catch {
      dispatch(getCoursesListErrorAction());
    }
  };
};

export const getTeachingCourses = () => {
  return async (dispatch) => {
    dispatch(getCoursesListFetchAction());
    try {
      const teaching = await getTeachingCoursesReq();
      dispatch(getCoursesListSuccessAction(teaching.data));
    } catch {
      dispatch(getCoursesListErrorAction());
    }
  };
};
