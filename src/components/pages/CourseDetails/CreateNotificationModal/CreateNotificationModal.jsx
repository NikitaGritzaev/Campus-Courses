import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import { Textarea, Checkbox } from "../../../UI/UI";
import { useForm } from "react-hook-form";
import { notificationValidator } from "../../../../utils/validation";
import { createNotification } from "../../../../store/thunk/coursesAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function CreateNotificationModal({ options, handleClose }) {
  const { handleSubmit, reset, control } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      await dispatch(
        createNotification(options.id, data.noteText, data.important)
      );
      handleClose();
      reset();
      toast.success("Успешно");
    } catch {
      toast.error("Ошибка");
    }
  };
  return (
    <ModalWindow
      onSubmit={handleSubmit(onSubmit)}
      show={options?.show}
      handleClose={handleClose}
      names={{
        header: "Создание уведомления",
        mainBtn: "Создать",
      }}
    >
      <FormLayout>
        <Textarea
          id="noteText"
          validator={notificationValidator}
          label="Текст уведомления"
          control={control}
        />
        <Checkbox id="important" label="Важное?" control={control} />
      </FormLayout>
    </ModalWindow>
  );
}
export default CreateNotificationModal;
