import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const InputFile = ({ onFileState, setFile, setFileName }) => {
  const filePicker = useRef(null);

  const [path, setPath] = useState(null);

  const handlerPicker = () => {
    filePicker.current.click();
  };
  const saveImgMain = (e) => {
    if (!e.target.files) {
      return;
    }

    setPath(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  return (
    <>
      <Button onClick={handlerPicker} color="orange">
        Выбрать основную фотографию
      </Button>
      <div className="flex flex-wrap">
        {onFileState && (
          <div className="m-3">
            <img src={`${path}`} alt="" className="w-20" />
          </div>
        )}
      </div>

      <input
        className="sr-only"
        onChange={saveImgMain}
        accept=".jpg, .jpeg,"
        type="file"
        id="file"
        label="Основное фото"
        required
        ref={filePicker}
      />
    </>
  );
};

InputFile.propTypes = {
  onFileState: PropTypes.object,
  setFile: PropTypes.func,
  setFileName: PropTypes.func,
};

export default InputFile;
