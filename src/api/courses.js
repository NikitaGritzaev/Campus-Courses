import instance from "./axios";

export const getCourseDetailsReq = async (id) =>
  await instance.get(`/courses/${id}/details`);

export const signUpCourseReq = async (id) =>
  await instance.post(`/courses/${id}/sign-up`);

export const editCourseStatusReq = async (id, status) =>
  await instance.post(`/courses/${id}/status`, { status });

export const editStudentStatusReq = async (id, studentId, status) =>
  await instance.post(`/courses/${id}/student-status/${studentId}`, {
    status,
  });

export const createNotificationReq = async (id, text, isImportant) =>
  await instance.post(`/courses/${id}/notifications`, {
    text,
    isImportant,
  });

export const editStudentMarkReq = async (id, studentId, markType, mark) =>
  await instance.post(`/courses/${id}/marks/${studentId}`, {
    markType,
    mark,
  });

export const createCourseReq = async (
  groupId,
  name,
  startYear,
  maximumStudentsCount,
  semester,
  requirements,
  annotations,
  mainTeacherId
) =>
  await instance.post(`/courses/${groupId}`, {
    name,
    startYear,
    maximumStudentsCount,
    semester,
    requirements,
    annotations,
    mainTeacherId,
  });

export const editCourseReq = async (id, requirements, annotations) =>
  await instance.put(`/courses/${id}`, {
    requirements,
    annotations,
  });

export const deleteCourseReq = async (id) =>
  await instance.delete(`/courses/${id}`);

export const addTeacherRoleReq = async (id, userId) =>
  await instance.post(`/courses/${id}/teachers`, { userId });

export const getMyCoursesReq = async () => await instance.get("/courses/my");

export const getTeachingCoursesReq = async () =>
  await instance.get("/courses/teaching");
