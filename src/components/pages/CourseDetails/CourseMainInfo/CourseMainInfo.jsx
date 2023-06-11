import { ListGroup, Button } from "react-bootstrap";
import {
  statusToText,
  semesterName,
} from "../../../../utils/CourseInfoHelpers";
import { BiPencil, BiCheckCircle } from "react-icons/bi";
function CourseMainInfo({
  courses,
  id,
  editCourseStatus,
  status,
  startYear,
  semester,
  maximumStudentsCount,
  studentsEnrolledCount,
  studentsInQueueCount,
  isAdmin,
  isTeacher,
  role,
  signUp
}) {
  const alreadySigned = courses.some(course => course.id === id);
  const hasPlaces = maximumStudentsCount > studentsEnrolledCount;
  return (
    <ListGroup className="my-2">
      <ListGroup.Item className="d-flex">
        <div>
          <p className="my-1 fw-bold">Статус курса</p>
          {statusToText(status)}
        </div>
        <div className="ms-auto d-flex">
        {!alreadySigned && !role?.status &&
          status === "OpenForAssigning" &&
          hasPlaces && (
            <Button
              variant="success"
              className="mx-1 d-flex align-items-center"
              onClick={signUp}
            >
              <BiCheckCircle/>&nbsp;Вступить
            </Button>
          )}
        {(isAdmin || isTeacher) && (
          <Button
            variant="warning"
            onClick={editCourseStatus}
            className="mx-1 d-flex align-items-center"
          >
            <BiPencil />
            &nbsp;Изменить
          </Button>
        )}
        </div>
      </ListGroup.Item>
      <ListGroup.Item>
        <div className="row">
          <div className="col-6">
            <p className="my-1 fw-bold">Учебный год</p>
            <p className="my-1">{`${startYear}-${startYear + 1}`}</p>
          </div>
          <div className="col-6">
            <p className="my-1 fw-bold">Семестр</p>
            <p className="my-1">{semesterName(semester)}</p>
          </div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item>
        <div className="row">
          <div className="col-6">
            <p className="my-1 fw-bold">Всего мест</p>
            <p className="my-1">{maximumStudentsCount}</p>
          </div>
          <div className="col-6">
            <p className="my-1 fw-bold">Студентов зачислено</p>
            <p className="my-1">{studentsEnrolledCount}</p>
          </div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item>
        <div>
          <p className="my-1 fw-bold">Заявок на рассмотрении</p>
          <p className="my-1">{studentsInQueueCount}</p>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default CourseMainInfo;
