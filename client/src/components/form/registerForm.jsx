import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Checkbox,
} from "@material-tailwind/react";

import { RegisterFormSchema } from "../../utilities/formSchema";
import InputField from "../common/form/sharedForm/InputField";
import { signUp } from "../../store/users";

const RegisterForm = ({ onToggleForm }) => {
  const [staySystem, setStaySystem] = useState(false);
  const [license, setLicense] = useState(false);



  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (data) => {
    if (!isValid) return;
    // console.log({ ...data, license, staySystem });
    dispatch(signUp({ ...data, license, staySystem, admin: false }));
    reset();
  };

  const validate = () => {
    if (isValid) {
      if (license) return false;
    }
    return true;
  };

  return (
    <Card className="w-full font-bk-bt sm:w-3/4 lg:w-1/2">
      <CardHeader
        variant="gradient"
        className="grid h-20 mb-4 place-items-center bg-green-1"
      >
        <Typography
          variant="h4"
          color="white"
          className="font-bk-bt text-main-white"
        >
          Регистрация
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            title="Login..."
            control={control}
            name="login"
            type="text"
            register={{ ...register("login") }}
          />
          <InputField
            title="Имя..."
            control={control}
            name="firstName"
            type="text"
            register={{ ...register("firstName") }}
          />
          <InputField
            title="Фамилия..."
            control={control}
            name="lastName"
            type="text"
            register={{ ...register("lastName") }}
          />
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
              id="StyOn"
              name="StyOn"
              checked={staySystem}
              type="checkbox"
              onChange={() => setStaySystem((prev) => !prev)}
            />
          </div>
          <div className="-ml-2.5 flex  place-items-center">
            <Checkbox
              label="Подтвердить"
              color="green"
              name="License"
              id="License"
              checked={license}
              type="checkbox"
              onChange={() => setLicense((prev) => !prev)}
            />
            <Link to={"/license"} className="ml-1 italic hover:text-green-1">
              лицензионное соглашение
            </Link>
          </div>

          <Button
            type="submit"
            color="green"
            className={"mt-6 bg-green-1 font-bk-rt"}
            variant="gradient"
            disabled={validate()}
            fullWidth
          >
            Отправить
          </Button>
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography
          variant="small"
          className="flex justify-center mt-6 font-bk-rt text-graphite"
        >
          У вас уже есть учетная запись?{" "}
          <Link
            to={"/login"}
            variant="small"
            className="ml-1 font-bold border-b-2 border-b-transparent font-bk-bt text-green-4 hover:border-b-green-1 hover:text-green-1"
            onClick={onToggleForm}
          >
            Войти
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

RegisterForm.propTypes = {
  onToggleForm: PropTypes.func,
};

export default RegisterForm;
