import {
  createCourseReq,
  getCourseDetailsReq,
  deleteCourseReq,
  editCourseReq,
  addTeacherRoleReq,
  editStudentMarkReq,
  createNotificationReq,
  editStudentStatusReq,
  editCourseStatusReq,
  signUpCourseReq,
} from "../../api/courses";
import {
  getCourseDetailsFetchAction,
  getCourseDetailsSuccessAction,
  getCourseDetailsErrorAction,
  deleteCourseAction,
  changeCourseAction,
  signUpCourseAction,
} from "../../store/reducers/courseReducer";
import { createCourseAction } from "../reducers/coursesListReducer";
import { store } from "../store";

export const createCourse = (
  groupId,
  name,
  startYear,
  maximumStudentsCount,
  semester,
  requirements,
  annotations,
  mainTeacherId
) => {
  return async (dispatch) => {
    const response = await createCourseReq(
      groupId,
      name,
      startYear,
      maximumStudentsCount,
      semester,
      requirements,
      annotations,
      mainTeacherId
    );
    const courses = response.data;
    dispatch(createCourseAction(courses));
  };
};

export const getCourseDetails = (id) => {
  return async (dispatch) => {
    dispatch(getCourseDetailsFetchAction());
    try {
      const response = await getCourseDetailsReq(id);
      const course = response.data;
      const account = store.getState().account;
      dispatch(getCourseDetailsSuccessAction(id, course, account));
    } catch {
      dispatch(getCourseDetailsErrorAction());
    }
  };
};

export const deleteCourse = (id) => {
  return async (dispatch) => {
    await deleteCourseReq(id);
    dispatch(deleteCourseAction(id));
  };
};

export const addTeacherRole = (courseId, userId) => {
  return async (dispatch) => {
    const response = await addTeacherRoleReq(courseId, userId);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const editCourse = (id, requirements, annotations) => {
  return async (dispatch) => {
    const response = await editCourseReq(id, requirements, annotations);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const createNotification = (id, text, isImportant) => {
  return async (dispatch) => {
    const response = await createNotificationReq(id, text, isImportant);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const editStudentMark = (id, studentId, markType, mark) => {
  return async (dispatch) => {
    const response = await editStudentMarkReq(id, studentId, markType, mark);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const editStudentStatus = (id, studentId, status) => {
  return async (dispatch) => {
    const response = await editStudentStatusReq(id, studentId, status);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const editCourseStatus = (id, status) => {
  return async (dispatch) => {
    const response = await editCourseStatusReq(id, status);
    const course = response.data;
    dispatch(changeCourseAction(course));
  };
};

export const signUpCourse = (id) => {
  return async (dispatch) => {
    const response = await signUpCourseReq(id);
    const course = response.data;
    dispatch(signUpCourseAction(id, course));
  };
};
