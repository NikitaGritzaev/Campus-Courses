import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import Select from "../../../UI/Select";
import Loader from "../../../animations/Loader";
import { requiredFieldValidator } from "../../../../utils/validation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTeacherRole } from "../../../../store/thunk/coursesAPI";
import { toast } from "react-toastify";

function AddTeacherModal({ options, users, students, handleClose }) {
  const { handleSubmit, control } = useForm({ mode: "onBlur" });
  const result = resultList(users, students);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      await dispatch(addTeacherRole(options.id, data.teacher.value));
      handleClose();
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
        header: "Добавить преподавателя",
        mainBtn: "Сохранить",
      }}
    >
      <FormLayout>
        {users && Object.keys(users).length ? (
          <Select
            id="teacher"
            label="Преподаватель"
            control={control}
            options={result?.map((user) => ({
              value: user.id,
              label: user.fullName,
            }))}
            validator={requiredFieldValidator}
            placeholder="Выберите преподавателя"
          />
        ) : (
          <Loader />
        )}
      </FormLayout>
    </ModalWindow>
  );
}

const resultList = (users, students) => {
  const set = new Set(students?.map(student => student.id));
  return users.filter(user => !set.has(user?.id));
}

export default AddTeacherModal;
