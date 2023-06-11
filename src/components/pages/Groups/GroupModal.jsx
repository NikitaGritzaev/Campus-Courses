import ModalWindow from "../../modal/Modal";
import { useForm } from "react-hook-form";
import FormLayout from "../../formLayout/FormLayout";
import { Input, Field } from "../../UI/UI";
import { groupNameValidator } from "../../../utils/validation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createGroup,
  editGroup,
  deleteGroup,
} from "../../../store/thunk/groupAPI";
import { toast } from "react-toastify";

function GroupModal({ options, handleClose }) {
  const dispatch = useDispatch();
  useEffect(() => {
    reset();
    setValue("group", options.name);
  }, [options]);
  const { control, handleSubmit, reset, setValue } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    let callback;
    switch (options.type) {
      case "EDIT":
        callback = () => dispatch(editGroup(options.id, data.group));
        break;
      case "DELETE":
        callback = () => dispatch(deleteGroup(options.id));
        break;
      case "CREATE":
        callback = () => dispatch(createGroup(data.group));
        break;
      default:
        return;
    }
    try {
      await callback();
      handleClose();
      toast.success("Успешно!");
    } catch (err) {
      toast.error("Ошибочка");
    }
  };
  const names = (type) => {
    switch (type) {
      case "DELETE":
        return {
          header: "Удаление",
          mainBtn: "Удалить",
        };
      case "CREATE":
        return {
          header: "Создание",
          mainBtn: "Создать",
        };
      default:
        return {};
    }
  };
  return (
    <ModalWindow
      onSubmit={handleSubmit(onSubmit)}
      names={names(options.type)}
      show={options.show}
      handleClose={handleClose}
    >
      <FormLayout>
        {options.type !== "DELETE" ? (
          <Input
            id="group"
            placeholder="Введите название"
            label="Название"
            control={control}
            validator={groupNameValidator}
          />
        ) : (
          <Field id="group" label="Вы хотите удалить:" value={options.name} />
        )}
      </FormLayout>
    </ModalWindow>
  );
}
export default GroupModal;
