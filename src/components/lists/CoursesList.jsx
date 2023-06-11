import ListGroup from "react-bootstrap/ListGroup";
import { statusToText, semesterName } from "../../utils/CourseInfoHelpers";
import { Link } from "react-router-dom";
import classes from "./ListOutline.module.css";

function CoursesList({ children }) {
  if (!children?.length)
    return (
      <ListGroup className="w-100 my-5">
        <h1 className="text-center">Группа пуста</h1>
      </ListGroup>
    );
  return <ListGroup className="w-100 my-5">{children}</ListGroup>;
}

function CourseItem({
  id,
  name,
  startYear,
  maximumStudentsCount,
  remainingSlotsCount,
  semester,
  status,
}) {
  return (
      <Link to={`/courses/${id}`}>
        <ListGroup.Item
          className={`${classes.listOutline} d-flex flex-column flex-md-row justify-content-between my-1 text-break shadow`}
        >
          <div className="col-sm-12 col-md-7">
            <p className="fw-bold fs-4">{name}</p>
            <p>{`Учебный год ${startYear}-${startYear + 1}`}</p>
            <p>{`Семестр - ${semesterName(semester)}`}</p>
            <p>{`Мест всего ${maximumStudentsCount}`}</p>
            <p>{`Мест осталось ${remainingSlotsCount}`}</p>
          </div>
          <div className="fs-5">{statusToText(status)}</div>
        </ListGroup.Item>
      </Link>
  );
}

CoursesList.Item = CourseItem;

export default CoursesList;
