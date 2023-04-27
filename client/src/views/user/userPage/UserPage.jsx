import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { ChangeEmailSchema } from "../../../utilities/formSchema";
import { getCurrentUserData, updateUser } from "../../../store/users";
import { InputField, UploadAvatarForm } from "../../../components/common";

const UserPage = ({ admin }) => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUserData());

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangeEmailSchema),
  });

  // Отправка формы
  const onSubmit = (data) => {
    if (!isValid) return;
    if (user) {
      dispatch(updateUser({ data, user }));
    }

    reset();
  };

  return (
    <div className="px-5 sm:mx-5 sm:flex sm:justify-around sm:px-0">
      <div className="mb-10">
        <Card>
          <CardHeader>
            <img
              src={user.image}
              alt=""
              className="inline-block w-[480px] object-cover object-center"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {user.firstName} {user.lastName}
            </Typography>
            {admin && <Typography className="mt-5">(Администратор)</Typography>}
          </CardBody>
          <CardFooter className="flex flex-col items-center">
            <Typography>{user.login}</Typography>
            <Typography>{user.email}</Typography>
          </CardFooter>
        </Card>
      </div>

      <div className="sm:px-5">
        {admin && (
          <ul>
            <li className="mt-5 text-base hover:text-green-2 dark:text-main-white dark:hover:text-green-3">
              <Link className="" to={"/admin"}>
                Перейти в админ-панель
              </Link>
            </li>
            <li className="mt-5 text-base hover:text-green-2 dark:text-main-white dark:hover:text-green-3">
              <Link className="" to={"/admin/upload"}>
                Создать и добавить новый продукт
              </Link>
            </li>
            <li className="mt-5 text-base hover:text-green-2 dark:text-main-white dark:hover:text-green-3">
              <Link className="" to={"/admin/list_product"}>
                Редактировать список продуктов
              </Link>
            </li>
          </ul>
        )}
        <div className="mt-5">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              title="Изменить электронную почту..."
              control={control}
              name="email"
              type="email"
              register={{ ...register("email") }}
            />
            <Button
              type="submit"
              color="green"
              className={"mt-1 bg-green-1 font-bk-rt"}
              variant="gradient"
              disabled={!isValid}
              fullWidth
            >
              изменить email
            </Button>
          </form>
        </div>

        <div className="mt-5">
          <UploadAvatarForm />
        </div>
      </div>
    </div>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string,
  admin: PropTypes.bool,
};

export default UserPage;
