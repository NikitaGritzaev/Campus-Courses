import {ListGroup, Badge} from "react-bootstrap";

function TeacherList({children}) {
  if (!children) return <ListGroup>Нет учителей</ListGroup>;
  return <ListGroup>{children}</ListGroup>;
}

function Teacher({ isMain, name, email }) {
  return (
    <ListGroup.Item className="mt-0 rounded-0">
      <p className="fw-bold">
        {name}&nbsp;
        {isMain && <Badge bg="success">основной</Badge>}
      </p>
      <p>{email}</p>
    </ListGroup.Item>
  );
}

TeacherList.Teacher = Teacher;

export default TeacherList;
