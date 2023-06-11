import CoursesList from "../../lists/CoursesList";
import { Button } from "react-bootstrap";
import Loader from "../../animations/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGroupCourses,
  getMyCourses,
  getTeachingCourses,
} from "../../../store/thunk/coursesListAPI";
import { getGroups } from "../../../store/thunk/groupAPI";
import CreateCourseModalContainer from "./CreateCourseModalContainer";
import { BiPlusCircle, BiArrowBack } from "react-icons/bi";

function CoursesListPage({ type }) {
  const { id } = useParams();
  const isAdmin = useSelector((store) => store.account?.roles?.isAdmin);
  const groupName = useSelector((store) => store.groups?.groups?.[id]);
  const courses = useSelector((store) => store.coursesList);

  const canCreate = isAdmin && type === "group";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    switch (type) {
      case "teaching":
        dispatch(getTeachingCourses());
        break;
      case "my":
        dispatch(getMyCourses());
        break;
      default:
        dispatch(getGroupCourses(id));
        if (!groupName) {
          dispatch(getGroups());
        }
    }
  }, []);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const onOpen = () => setModalShow(true);

  if (courses.loading) return <Loader />;
  if (courses.error) return <h1>Группа не найдена!</h1>;
  return (
    <>
      {canCreate && (
        <CreateCourseModalContainer
          show={modalShow}
          groupId={id}
          handleClose={handleClose}
        />
      )}
      <div className="mt-3 w-75">
        <div className="d-flex align-items-center">
          {type === "group" && (
            <Button
              className="d-flex"
              variant="secondary"
              onClick={() => navigate("/groups")}
            >
              <BiArrowBack />
            </Button>
          )}
          &nbsp;
          <h1>{groupName}</h1>
        </div>

        {canCreate && (
          <Button className="d-flex align-items-center" onClick={onOpen}>
            <BiPlusCircle />
            &nbsp;СОЗДАТЬ КУРС
          </Button>
        )}
        <CoursesList>
          {courses?.courses?.map((course) => (
            <CoursesList.Item {...course} key={course.id} />
          ))}
        </CoursesList>
      </div>
    </>
  );
}

export default CoursesListPage;
