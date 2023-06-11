import GroupList from "../../lists/GroupList";
import { Button } from "react-bootstrap";
import GroupModal from "./GroupModal";
import { useState, useEffect } from "react";
import Loader from "../../animations/Loader";
import { getGroups } from "../../../store/thunk/groupAPI";
import { useDispatch, useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";

function GroupsPage() {
  const isAdmin = useSelector((store) => store.account?.roles?.isAdmin);
  const groups = useSelector((store) => store.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, []);
  const [modalState, setModalState] = useState({ show: false });
  const handleClose = () => setModalState({ show: false });
  const onEdit = (id, name) => {
    setModalState({ show: true, type: "EDIT", id, name });
  };
  const onDelete = (id, name) => {
    setModalState({ show: true, type: "DELETE", id, name });
  };
  const onCreate = () => {
    setModalState({ show: true, type: "CREATE", id: null });
  };
  if (groups?.loading) {
    return <Loader />;
  }
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-3">
      <h1 className="text-center word-wrap">Группы курсов</h1>
      {isAdmin && (
        <Button
          onClick={onCreate}
          variant="success"
          className="my-2 d-flex align-items-center"
        >
          <BiPlusCircle />
          &nbsp;СОЗДАТЬ
        </Button>
      )}
      <GroupList>
        {Object.entries(groups?.groups).map((group) => (
          <GroupList.Item
            name={group[1]}
            onEdit={onEdit}
            onDelete={onDelete}
            id={group[0]}
            key={group[0]}
          />
        ))}
      </GroupList>
      {isAdmin && <GroupModal options={modalState} handleClose={handleClose} />}
    </div>
  );
}

export default GroupsPage;
