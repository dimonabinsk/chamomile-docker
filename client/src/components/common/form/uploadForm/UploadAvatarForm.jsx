import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import InputAvatar from "./InputAvatar";
import { useDispatch } from "react-redux";
import { updateUserAvatar } from "../../../../store/users";

const UploadAvatarForm = () => {
  const dispatch = useDispatch();
  const [isAvatar, setAvatar] = useState(null);

  const avatarSubmit = (e) => {
    e.preventDefault();
    if (isAvatar) {
      const formData = new FormData();
      formData.append("avatar", isAvatar);
      dispatch(updateUserAvatar(formData));
      setAvatar(null);
    }
  };

  return (
    <div className="mt-8">
      <Typography
        variant="h5"
        className="text-center font-bk-rt dark:text-main-white"
      >
        Изменить аватар
      </Typography>
      <form onSubmit={avatarSubmit} className="mt-4">
        <InputAvatar onAvatarState={isAvatar} setAvatar={setAvatar} />
        <Button color="green" type="submit" className="w-full mt-3">
          Заменить
        </Button>
      </form>
    </div>
  );
};

export default UploadAvatarForm;
