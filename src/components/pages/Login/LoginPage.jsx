import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormLayout from "../../formLayout/FormLayout";
import Input from "../../UI/Input";
import { emailValidator, passwordValidator } from "../../../utils/validation";
import { login } from "../../../store/thunk/accountAPI";
import ERRORS from "./../../../utils/errors";
import { useDispatch } from "react-redux";
import { BiLogInCircle } from "react-icons/bi";
import { toast } from "react-toastify";

function LoginPage() {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data.email, data.password));
      toast.success("Рады видеть Вас снова!");
    } catch (error) {
      switch (error.response?.status) {
        case 400:
          setError("root.general", { message: ERRORS.LOGIN_BAD });
          return;
        default:
          setError("root.general", { message: ERRORS.UNKNOWN });
      }
    }
  };

  return (
    <div className="w-75 mt-4">
      <FormLayout header="Авторизация" decor>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            placeholder="Введите почту"
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

          <Button type="submit" className="my-2 fs-5 d-flex align-items-center">
            <BiLogInCircle /> Войти
          </Button>
          <p className="text-danger fw-bold">
            {errors?.root?.general?.message}
          </p>
        </form>
      </FormLayout>
    </div>
  );
}

export default LoginPage;
