import { Tab, Tabs, Button } from "react-bootstrap";
import TeacherList from "./TeachersList/TeacherList";
import StudentList from "./StudentsList/StudentList";
import { BiStar, BiUser, BiPlusCircle } from "react-icons/bi";

function Members({
  id,
  isAdmin,
  isMainTeacher,
  isTeacher,
  addTeacher,
  teachers,
  students,
  editMidtermMark,
  editFinalMark,
  role
}) {
  return (
    <div className="my-5">
      <Tabs fill>
        <Tab
          eventKey="teachers"
          title={
            <>
              <BiStar />
              &nbsp;Преподаватели
            </>
          }
          tabClassName="text-black fs-5"
          className="p-3 border-top-0 border"
        >
          {(isAdmin || isMainTeacher) && (
            <Button
              onClick={addTeacher}
              className="my-2 d-flex align-items-center"
            >
              <BiPlusCircle />
              &nbsp;Добавить препода
            </Button>
          )}
          <TeacherList>
            {teachers?.map((teacher, i) => (
              <TeacherList.Teacher {...teacher} key={i} />
            ))}
          </TeacherList>
        </Tab>
        <Tab
          eventKey="students"
          title={
            <>
              <BiUser />
              &nbsp;Студенты
            </>
          }
          tabClassName="text-black fs-5"
          className="p-3 border-top-0 border"
        >
          <StudentList
            id={id}
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            students={students}
            userRoles={role}
            editMidtermMark={editMidtermMark}
            editFinalMark={editFinalMark}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Members;
