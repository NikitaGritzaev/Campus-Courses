import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import Radio from "../../../UI/Radio";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { editStudentMark } from "../../../../store/thunk/coursesAPI";
import { MIDTERM } from "../CourseStatuses";
function EditCourseMarkModal({ options, handleClose }) {
  const { handleSubmit, reset, control } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      await dispatch(editStudentMark(options.courseId, options.studentId, options.markType, data.mark));
      handleClose();
      reset();
      toast.success("Успешно");
    }
    catch {
      toast.error("Ошибка");
    }
  };
  return (
    <ModalWindow
      onSubmit={handleSubmit(onSubmit)}
      show={options.show}
      handleClose={() => {handleClose(); reset();}}
      names={{
        header: options.markType === MIDTERM ? "Промежуточная оценка" : "Финальная оценка",
      }}
    >
      <FormLayout>
        <Radio
          id="mark"
          label="Оценка"
          control={control}
          options={[
            {id: "NotDefined", name: "Нет оценки"},
            { id: "Failed", name: "Провалено" },
            { id: "Passed", name: "Пройдено" },
          ]}
          defaultValue={options.result}
        />
      </FormLayout>
    </ModalWindow>
  );
}
export default EditCourseMarkModal;
