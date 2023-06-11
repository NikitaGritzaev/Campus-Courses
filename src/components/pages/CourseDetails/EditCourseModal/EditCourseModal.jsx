import ModalWindow from "../../../modal/Modal";
import FormLayout from "../../../formLayout/FormLayout";
import { richTextRequiredValidator } from "../../../../utils/validation";
import RichEditor from "../../../UI/RichEditor";
import {useForm} from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCourse } from "../../../../store/thunk/coursesAPI";
import { RichToHtml } from "../../../../utils/RichText";
import { toast } from "react-toastify";

function EditCourseModal({ options, handleClose }) {
  const { handleSubmit, control } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      await dispatch(editCourse(options.id, RichToHtml(data.requirements), RichToHtml(data.annotations)));
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
      show={options.show}
      handleClose={handleClose}
      names={{header: "Редактировать курс"}}
    >
      <FormLayout>
        <RichEditor
          id="requirements"
          label="Требования"
          control={control}
          validator={richTextRequiredValidator}
          defaultValue={options?.requirements}
        />

        <RichEditor
          id="annotations"
          label="Аннотации"
          control={control}
          validator={richTextRequiredValidator}
          defaultValue={options?.annotations}
        />
      </FormLayout>
    </ModalWindow>
  );
}
export default EditCourseModal;
