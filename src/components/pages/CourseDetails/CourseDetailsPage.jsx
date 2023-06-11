import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {CourseMainInfo, CourseSecondaryInfo, Members, CourseDetailsModals, modalsDefault, courseDetailsHandlers} from "./CourseDetailsComponents";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "../../../store/thunk/coursesAPI";
import {getMyCourses} from "../../../store/thunk/coursesListAPI";
import { getUsers } from "../../../store/thunk/usersAPI";
import { useParams } from "react-router-dom";
import Loader from "../../animations/Loader";
import { BiPencil, BiXCircle } from "react-icons/bi";

function CourseDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalsState, setModalsState] = useState(modalsDefault);
  const handleClose = () => setModalsState(modalsDefault);

  const course = useSelector((store) => store?.course);
  const courses = useSelector(store => store?.coursesList?.courses);
  const isAdmin = useSelector((store) => store?.account?.roles?.isAdmin);
  const isMainTeacher = course?.details?.role?.isMain;
  const isTeacher = course?.details?.role?.status === "teacher";
  const users = useSelector((store) => store.users);

  const {
    remove,
    edit,
    editStatus,
    signUp,
    notify,
    addTeacher,
    editMidtermMark,
    editFinalMark,
  } = courseDetailsHandlers(modalsState, setModalsState, course, id);

  useEffect(() => {
    dispatch(getMyCourses());
    dispatch(getCourseDetails(id));
  }, []);

  if (course?.error) {
    return <h2 className="mt-5">Курс не найден</h2>;
  }
  if (course?.loading) {
    return <Loader />;
  }
  return (
    <div className="w-75 mt-3">
      <h2 className="text-center">Основные данные курса</h2>
      <h1 className="text-center">{course?.details?.name}</h1>
      <div className="d-flex w-100 mt-3">
        {isAdmin && (
          <Button
            variant="danger"
            className="mx-1 d-flex align-items-center"
            onClick={remove}
          >
            <BiXCircle />
            &nbsp;Удалить
          </Button>
        )}
        {(isTeacher || isAdmin) && (
          <Button
            variant="warning"
            className="ms-auto mx-1 d-flex align-items-center"
            onClick={edit}
          >
            <BiPencil />
            &nbsp;Править
          </Button>
        )}
      </div>
      <CourseDetailsModals
        modalsState={modalsState}
        handleClose={handleClose}
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        isMainTeacher={isMainTeacher}
        users={users}
        students={course?.details?.students}
      />
      <CourseMainInfo
        {...course?.details}
        courses={courses}
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        editCourseStatus={editStatus}
        signUp={signUp}
      />
      <CourseSecondaryInfo
        {...course?.details}
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        addNotify={notify}
      />
      <Members
        {...course?.details}
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        isMainTeacher={isMainTeacher}
        addTeacher={() => {
          dispatch(getUsers());
          addTeacher();
        }}
        editMidtermMark={(studentId, mark) => {
          if (!isAdmin && !isTeacher) return;
          editMidtermMark(studentId, mark);
        }}
        editFinalMark={(studentId, mark) => {
          if (!isAdmin && !isTeacher) return;
          editFinalMark(studentId, mark);
        }}
      />
    </div>
  );
}

export default CourseDetailsPage;
