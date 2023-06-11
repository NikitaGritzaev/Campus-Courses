import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import {useForm} from "react-hook-form";
import Field from "../../../UI/Field";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../../store/thunk/coursesAPI";
import { useNavigate } from "react-router-dom";

function DeleteCourseModal({ options, handleClose }) {
  const { handleSubmit } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    try {
      await dispatch(deleteCourse(options.id));
      handleClose();
      navigate("/groups");
      toast.success("Успешно");
    }
    catch {
      toast.error("Ошибка");
    }
  };
  return (
    <ModalWindow
      onSubmit={handleSubmit(onSubmit)}
      show={options?.show}
      handleClose={handleClose}
      names={{
        header: "ВЫ ХОТИТЕ УДАЛИТЬ КУРС",
        mainBtn: "Подтвердить",
      }}
    >
      <FormLayout>
      <Field
        label="Имя курса"
        value={options?.name}
      />
      </FormLayout>
    </ModalWindow>
  );
}
export default DeleteCourseModal;