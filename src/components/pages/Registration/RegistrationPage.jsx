import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormLayout from "../../formLayout/FormLayout";
import Input from "../../UI/Input";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  birthdayValidator,
} from "../../../utils/validation";
import { useDispatch } from "react-redux";
import { registration } from "../../../store/thunk/accountAPI";
import ERRORS from "./../../../utils/errors";
import { BiLogInCircle } from "react-icons/bi";
import {toast} from "react-toastify";

function RegistrationPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({ mode: "onBlur" });
  let password = watch("password", "");

  const passwordRepeatValidator = {
    required: ERRORS.REQUIRED,
    validate: (value) => {
      if (value !== password) {
        return ERRORS.PASSWORD_SAME;
      }
    },
  };

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(
        registration(
          data.fullName,
          data.birthDate + "T00:00:00.000Z",
          data.email,
          data.password,
          data.confirmPassword
        )
      );
      toast.success("Вы успешно зарегистрировались!")
    } catch (error) {
      switch (error.response?.status) {
        case 409:
          setError("root.general", { message: ERRORS.REGISTER_USER_EXIST });
          return;
        default:
          setError("root.general", { message: ERRORS.UNKNOWN });
      }
    }
  };

  return (
    <div className="w-75 mt-4">
      <FormLayout header="Регистрация нового пользователя" decor>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="fullName"
            placeholder="Введите ФИО"
            label="ФИО"
            control={control}
            validator={nameValidator}
          />
          <Input
            id="birthDate"
            type="date"
            placeholder="Укажите дату рождения"
            label="Дата рождения"
            control={control}
            validator={birthdayValidator}
          />
          <Input
            id="email"
            placeholder="Почта будет использоваться для входа!"
            label="Почта"
            control={control}
            validator={emailValidator}
          />
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            label="Пароль"
            control={control}
            validator={passwordValidator}
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            label="Пароль ещё раз"
            control={control}
            validator={passwordRepeatValidator}
          />
          <Button type="submit" className="my-2 fs-5 d-flex align-items-center">
            <BiLogInCircle/> Регистрация
          </Button>
        </form>
        <p className="text-danger fw-bold">{errors?.root?.general?.message}</p>
      </FormLayout>
    </div>
  );
}

export default RegistrationPage;
