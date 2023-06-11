import { Modal, Button } from "react-bootstrap";
import classes from "./Modal.module.css";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";

function ModalWindow({ names, onSubmit, children, show, handleClose }) {
  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      contentClassName={classes.modalContent}
      className="modal"
    >
      <div className={classes.modalAppear}>
        <Modal.Header
          closeButton
          className={`${classes.dark} ${classes.darkShadow}`}
        >
          <Modal.Title>{names?.header || "Редактирование"}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Body className={classes.dark}>
            {show ? children : null}
          </Modal.Body>
          <Modal.Footer className={`${classes.dark} ${classes.darkShadow}`}>
            <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center">
            <BiXCircle/>&nbsp;{names?.secondaryBtn || "Отмена"}
            </Button>
            <Button type="submit" onClick={onSubmit} className="d-flex align-items-center">
              <BiCheckCircle/>&nbsp;{names?.mainBtn || "Сохранить"}
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default ModalWindow;
