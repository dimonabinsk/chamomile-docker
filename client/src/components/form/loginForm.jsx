import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { LoginFormSchema } from "../../utilities/formSchema";
import { login } from "../../store/users";
import { InputField } from "../common";

const LoginForm = ({ onToggleForm }) => {
  const [staySystem, setStaySystem] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  // Отправка формы
  const onSubmit = (data) => {
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    // console.log({ ...data, staySystem });
    dispatch(login({ payload: { ...data, staySystem }, redirect }));
    reset();
  };
  return (
    <Card className="w-full font-bk-bt sm:w-3/4 lg:w-1/2">
      <CardHeader
        variant="gradient"
        className="mb-4 grid h-20 place-items-center bg-green-1"
      >
        <Typography variant="h4" className="font-bk-bt text-main-white">
          Авторизация
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            title="Электронная почта..."
            control={control}
            name="email"
            type="email"
            register={{ ...register("email") }}
          />
          <InputField
            title="Пароль..."
            control={control}
            name="password"
            type="password"
            register={{ ...register("password") }}
          />

          <div className="-ml-2.5">
            <Checkbox
              label="Запомнить меня"
              color="green"
              name="checkbox"
              checked={staySystem}
              type="checkbox"
              onChange={() => setStaySystem((prev) => !prev)}
            />
          </div>
          <Button
            type="submit"
            color="green"
            className={"mt-6 bg-green-1 font-bk-rt"}
            variant="gradient"
            disabled={!isValid}
            fullWidth
          >
            войти
          </Button>
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography
          variant="small"
          className="mt-6 flex justify-center font-bk-rt text-graphite"
        >
          У вас нет учетной записи?{" "}
          <Link
            to={"/login"}
            variant="small"
            className="ml-1 border-b-2 border-b-transparent font-bk-bt font-bold text-green-4 hover:border-b-green-1 hover:text-green-1"
            onClick={onToggleForm}
          >
            Регистрация
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

LoginForm.propTypes = {
  onToggleForm: PropTypes.func,
};

export default LoginForm;
