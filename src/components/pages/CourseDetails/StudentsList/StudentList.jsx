import { ListGroup, Button } from "react-bootstrap";
import {
  getStudentStatusText,
  getStudentMarkBadge,
  ACCEPTED,
  IN_QUEUE,
} from "../CourseStatuses";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import { editStudentStatus } from "../../../../store/thunk/coursesAPI";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";

function StudentList({
  id,
  students,
  userRoles,
  isAdmin,
  isTeacher,
  editMidtermMark,
  editFinalMark,
}) {
  const dispatch = useDispatch();
  const accept = (studentId) => {
    try {
      dispatch(editStudentStatus(id, studentId, "Accepted"));
      toast.success("Студент принят");
    }
    catch {
      toast.error("Ошибка");
    }
  };
  const decline = (studentId) => {
    try {
      dispatch(editStudentStatus(id, studentId, "Declined"));
      toast.success("Студент отклонен");
    }
    catch {
      toast.error("Ошибка");
    }
  };
  let hasVisibleStudents = false;
  let studentItems = students?.map((student) => {
    const blockView = !isAdmin && !isTeacher && student.status !== ACCEPTED;
    if (blockView) {
      return null;
    }
    hasVisibleStudents = true;
    return (
      <StudentList.Student
        {...student}
        accept={accept}
        decline={decline}
        userRoles={userRoles}
        isAdmin={isAdmin}
        isTeacher={isTeacher}
        key={student.id}
        editMidtermMark={editMidtermMark}
        editFinalMark={editFinalMark}
      />
    );
  });
  return (
    <ListGroup>{hasVisibleStudents ? studentItems : "Нет студентов"}</ListGroup>
  );
}

function Student({
  id,
  accept,
  decline,
  name,
  email,
  status,
  midtermResult,
  finalResult,
  userRoles,
  isAdmin,
  isTeacher,
  editMidtermMark,
  editFinalMark,
}) {
  const showBtnPanel = (isAdmin || isTeacher) && status === IN_QUEUE;
  const showMarks =
    status === ACCEPTED && (isAdmin || isTeacher || userRoles?.email === email);
  return (
    <ListGroup.Item className="mt-0 rounded-0">
      <div className="row">
        <div className="col-md-4">
          <p className="fw-bold my-0">{name}</p>
          {getStudentStatusText(status)}
          <p className="my-0">{email}</p>
        </div>
        {showMarks && (
          <>
            <div
              className="col-md-4"
              onClick={() => editMidtermMark(id, midtermResult)}
              style={{ cursor: "pointer" }}
            >
              Промежуточная аттестация - {getStudentMarkBadge(midtermResult)}
            </div>
            <div
              className="col-md-4"
              onClick={() => editFinalMark(id, finalResult)}
              style={{ cursor: "pointer" }}
            >
              Финальная аттестация - {getStudentMarkBadge(finalResult)}
            </div>
          </>
        )}
        {showBtnPanel && (
          <div className="col">
            <Button
              className="h-100 mx-1 float-end d-flex align-items-center"
              variant="danger"
              onClick={() => decline(id)}
            >
              <BiXCircle />
              &nbsp;Отклонить
            </Button>
            <Button
              className="h-100 mx-1 float-end d-flex align-items-center"
              onClick={() => accept(id)}
            >
              <BiCheckCircle />
              &nbsp;Принять
            </Button>
          </div>
        )}
      </div>
    </ListGroup.Item>
  );
}

StudentList.Student = Student;

export default StudentList;
