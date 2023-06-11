import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import {useForm} from "react-hook-form";
import Field from "../../../UI/Field";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpCourse } from "../../../../store/thunk/coursesAPI";
import { getRoles } from "../../../../store/thunk/accountAPI";
function SignUpModal({ options, handleClose }) {
  const { handleSubmit } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const onSubmit = async () => {
    try {
      await dispatch(signUpCourse(options.id));
      toast.success("Успешно");
      await dispatch(getRoles());
      handleClose();
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
        header: "Записаться на курс",
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
export default SignUpModal;