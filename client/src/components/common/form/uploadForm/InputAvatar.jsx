import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const InputAvatar = ({ onAvatarState, setAvatar }) => {
  const avatarPicker = useRef(null);

  const [path, setPath] = useState(null);

  const handlerPicker = () => {
    avatarPicker.current.click();
  };
  const saveAvatar = (e) => {
    if (!e.target.files) {
      return;
    }
    setPath(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  };
  return (
    <>
      <Button onClick={handlerPicker} color="orange" className="w-full">
        Загрузить новый аватар
      </Button>
      <div className="flex flex-wrap">
        {onAvatarState && (
          <div className="m-3">
            <img src={`${path}`} alt="аватар" className="w-20" />
          </div>
        )}
      </div>

      <input
        className="sr-only"
        onChange={saveAvatar}
        accept=".jpg, .jpeg,"
        type="file"
        id="file"
        label="Основное фото"
        required
        ref={avatarPicker}
        name="avatar"
      />
    </>
  );
};

InputAvatar.propTypes = {
  onAvatarState: PropTypes.object,
  setAvatar: PropTypes.func,
};

export default InputAvatar;
