import EditCourseModal from "./EditCourseModal/EditCourseModal";
import CreateNotificationModal from "./CreateNotificationModal/CreateNotificationModal";
import EditCourseStatusModal from "./EditCourseStatusModal/EditCourseStatusModal";
import AddTeacherModal from "./AddTeacherModal/AddTeacherModal";
import SignUpModal from "./SignUpModal/SignUpModal";
import EditCourseMarkModal from "./EditMarkModal/EditMarkModal";
import DeleteCourseModal from "./DeleteCourseModal/DeleteCourseModal";

export function CourseDetailsModals({
  isAdmin,
  isTeacher,
  isMainTeacher,
  handleClose,
  modalsState,
  users,
  students,
}) {
  if (!modalsState) return;
  return (
    <>
      {isAdmin && (
        <DeleteCourseModal
          options={modalsState.deleteCourseModal}
          handleClose={handleClose}
        />
      )}
      {(isAdmin || isTeacher) && (
        <EditCourseModal
          options={modalsState.editCourseModal}
          handleClose={handleClose}
        />
      )}
      {(isAdmin || isTeacher) && (
        <EditCourseStatusModal
          options={modalsState.editCourseStatusModal}
          handleClose={handleClose}
        />
      )}
      {(isAdmin || isTeacher) && (
        <CreateNotificationModal
          options={modalsState.createNotificationModal}
          handleClose={handleClose}
        />
      )}
      {(isAdmin || isMainTeacher) && (
        <AddTeacherModal
          users={users}
          students={students}
          options={modalsState.addTeacherModal}
          handleClose={handleClose}
        />
      )}
        {!isTeacher && <SignUpModal
          options={modalsState.signUpModal}
          handleClose={handleClose}
        />}
      {(isAdmin || isTeacher) && (
        <EditCourseMarkModal
          options={modalsState.editMarkModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export const modalsDefault = {
  editCourseModal: { show: false },
  editCourseStatusModal: { show: false },
  createNotificationModal: { show: false },
  addTeacherModal: { show: false },
  editMarkModal: { show: false },
  signUpModal: { show: false },
  deleteCourseModal: { show: false },
};

export const courseDetailsHandlers = (
  modalsState,
  setModalsState,
  course,
  id
) => {
  const remove = () =>
    setModalsState({
      ...modalsState,
      deleteCourseModal: {
        name: course?.details?.name,
        show: true,
        id,
      },
    });
  const edit = () =>
    setModalsState({
      ...modalsState,
      editCourseModal: {
        show: true,
        annotations: course?.details?.annotations,
        requirements: course?.details?.requirements,
        id,
      },
    });
  const editStatus = () =>
    setModalsState({
      ...modalsState,
      editCourseStatusModal: {
        show: true,
        status: course?.details?.status,
        id,
      },
    });
  const signUp = () =>
    setModalsState({
      ...modalsState,
      signUpModal: {
        show: true,
        name: course?.details?.name,
        id,
      },
    });
  const notify = () =>
    setModalsState({
      ...modalsState,
      createNotificationModal: { show: true, id },
    });
  const addTeacher = () => {
    setModalsState({
      ...modalsState,
      addTeacherModal: { show: true, id },
    });
  };
  const editMidtermMark = (studentId, mark) => {
    setModalsState({
      ...modalsState,
      editMarkModal: {
        show: true,
        courseId: id,
        studentId,
        result: mark,
        markType: "Midterm",
      },
    });
  };
  const editFinalMark = (studentId, mark) => {
    setModalsState({
      ...modalsState,
      editMarkModal: {
        show: true,
        courseId: id,
        studentId,
        result: mark,
        markType: "Final",
      },
    });
  };
  return {
    remove,
    edit,
    editStatus,
    signUp,
    notify,
    addTeacher,
    editMidtermMark,
    editFinalMark,
  };
};
