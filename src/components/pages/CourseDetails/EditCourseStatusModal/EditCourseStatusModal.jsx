import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import Radio from "../../../UI/Radio";
import { useForm } from "react-hook-form";
import {
  CREATED,
  OPEN_FOR_ASSIGNING,
  STARTED,
} from "../CourseStatuses";
import { getStatus } from "../CourseStatuses";
import { editCourseStatus } from "../../../../store/thunk/coursesAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
function EditCourseStatusModal({ options, handleClose }) {
  const { handleSubmit, control } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const statusConst = getStatus(options?.status);
  const onSubmit = async (data) => {
    try {
      await dispatch(editCourseStatus(options.id, data.status));
      handleClose();
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
      names={{header: "Изменение статуса курса"}}
    >
      <FormLayout>
        <Radio
          id="status"
          label="Статус"
          control={control}
          options={[
            {
              id: "Created",
              name: "Создан",
              disabled: statusConst > CREATED,
            },
            {
              id: "OpenForAssigning",
              name: "Открыт для записи",
              disabled: statusConst > OPEN_FOR_ASSIGNING,
            },
            {
              id: "Started",
              name: "В процессе",
              disabled: statusConst > STARTED,
            },
            { id: "Finished", name: "Завершен" },
          ]}
          defaultValue={options?.status}
        />
      </FormLayout>
    </ModalWindow>
  );
}
export default EditCourseStatusModal;
