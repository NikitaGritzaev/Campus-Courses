import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormLayout from "../../formLayout/FormLayout";
import { Input, Field } from "../../UI/UI.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nameValidator, birthdayValidator } from "../../../utils/validation";
import { editProfile } from "../../../store/thunk/accountAPI";
import { toast } from "react-toastify";
import { BiPencil, BiSave } from "react-icons/bi";

function ProfilePage() {
  const profile = useSelector((store) => store.account.profile);
  const { control, handleSubmit, setValue } = useForm({ mode: "onBlur" });

  useEffect(() => {
    setValue("fullName", profile?.fullName);
    setValue("birthDate", profile?.birthDate.toLocaleString().slice(0, 10));
  }, [profile]);

  const onSubmit = async (data) => {
    if (!editState) {
      setEditState(true);
      return false;
    }
    try {
      await dispatch(editProfile(data.fullName, data.birthDate));
      setEditState(false);
      toast.success("Профиль изменен");
    } catch {
      toast.error("Произошла ошибка");
    }
  };
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  return (
    <div className="w-75 mt-4">
      <FormLayout decor>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="fullName"
            placeholder="Введите ФИО"
            label="ФИО"
            control={control}
            validator={nameValidator}
            disabled={!editState}
          />
          <Field
            id="email"
            placeholder="Электронная почта"
            label="Email"
            value={profile?.email}
          />
          <Input
            id="birthDate"
            type="date"
            label="Дата рождения"
            control={control}
            validator={birthdayValidator}
            disabled={!editState}
          />
          <Button
            type="submit"
            className="mt-2 d-flex align-items-center"
            variant={editState ? "warning" : "primary"}
          >
            {editState ? (
              <>
                <BiSave />
                &nbsp;Сохранить
              </>
            ) : (
              <>
                <BiPencil />
                &nbsp;Изменить
              </>
            )}
          </Button>
        </form>
      </FormLayout>
    </div>
  );
}

export default ProfilePage;
