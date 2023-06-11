import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/thunk/usersAPI";
import { toast } from "react-toastify";
import { RichToHtml } from "../../../utils/RichText";
import { createCourse } from "../../../store/thunk/coursesAPI";
import CreateCourseModal from "./CreateCourseModal";
function CreateCourseModalContainer({ show, groupId, handleClose }) {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { handleSubmit, reset, control } = useForm({ mode: "onBlur" });

  const submitHandler = async (data) => {
    try {
      dispatch(
        createCourse(
          groupId,
          data.name,
          data.startYear,
          data.maximumStudentsCount,
          data.semester,
          RichToHtml(data.requirements),
          RichToHtml(data.annotations),
          data.mainTeacherId.value
        )
      );
      reset();
      handleClose();
      toast.success("Курс создан");
    } catch (err) {
      toast.error("Ошибка");
    }
  };

  return (
    <CreateCourseModal
      show={show}
      handleClose={handleClose}
      control={control}
      users={users}
      onSubmit={handleSubmit(submitHandler)}
    />
  );
}
export default CreateCourseModalContainer;
