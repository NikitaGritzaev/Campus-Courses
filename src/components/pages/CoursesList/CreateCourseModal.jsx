import ModalWindow from "../../modal/Modal";
import FormLayout from "../../formLayout/FormLayout";
import {
  requiredFieldValidator,
  startYearValidator,
  studentCountValidator,
  richTextRequiredValidator,
} from "../../../utils/validation";
import { Input, RichEditor, Radio, Select } from "../../UI/UI";

function CreateCourseModal({ show, handleClose, control, users, onSubmit }) {
  return (
    <ModalWindow
      onSubmit={onSubmit}
      show={show}
      handleClose={handleClose}
      names={{
        header: "Создать курс",
        mainBtn: "Создать"
      }}
    >
      <FormLayout>
        <Input
          id="name"
          label="Название"
          control={control}
          placeholder="Название курса"
          validator={requiredFieldValidator}
        />

        <Input
          id="startYear"
          label="Год начала курса"
          control={control}
          placeholder="Введите год"
          validator={startYearValidator}
          mask={"9999"}
        />

        <Input
          id="maximumStudentsCount"
          label="Общее количество мест"
          control={control}
          placeholder="Количество мест"
          validator={studentCountValidator}
          mask={"999"}
        />

        <Radio
          id="semester"
          label="Семестр"
          control={control}
          options={[
            { id: "Spring", name: "Весенний" },
            { id: "Autumn", name: "Осенний" },
          ]}
          defaultValue="Spring"
        />

        <RichEditor
          id="requirements"
          label="Требования"
          control={control}
          validator={richTextRequiredValidator}
        />

        <RichEditor
          id="annotations"
          label="Аннотации"
          control={control}
          validator={richTextRequiredValidator}
        />

        <Select
          id="mainTeacherId"
          label="Основной преподаватель"
          control={control}
          options={users?.map((user) => ({
            value: user.id,
            label: user.fullName,
          }))}
          validator={requiredFieldValidator}
          placeholder="Выберите преподавателя"
        />
      </FormLayout>
    </ModalWindow>
  );
}
export default CreateCourseModal;
