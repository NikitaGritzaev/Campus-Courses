import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./ListOutline.module.css";
import { BiPencil, BiXCircle, BiGroup } from "react-icons/bi";

function GroupList({ children }) {
  if (!children?.length) return <h1 className="mt-3">Групп нет</h1>;
  return <ListGroup className="w-75">{children}</ListGroup>;
}

function GroupItem({ id, name, onEdit, onDelete }) {
  const isAdmin = useSelector((store) => store.account?.roles?.isAdmin);
  return (
      <ListGroup.Item
        as={Link}
        to={`/groups/${id}`}
        className={`${classes.listOutline} d-flex flex-column flex-md-row align-items-center shadow my-1 py-3`}
      >
        <BiGroup size={25} />
        <span className="me-md-auto text-center text-break fs-5">&nbsp;{name}</span>
        {isAdmin && (
          <>
            <Button
              variant="warning"
              className="m-1 d-flex align-items-center"
              onClick={(e) => {
                e.preventDefault();
                onEdit(id, name);
              }}
            >
              <BiPencil />&nbsp;Редактировать
            </Button>
            <Button
              variant="danger"
              className="m-1 d-flex align-items-center"
              onClick={(e) => {
                e.preventDefault();
                onDelete(id, name);
              }}
            >
              <BiXCircle />&nbsp;Удалить
            </Button>
          </>
        )}
      </ListGroup.Item>
  );
}

GroupList.Item = GroupItem;

export default GroupList;
