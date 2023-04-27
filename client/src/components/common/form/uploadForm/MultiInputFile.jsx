import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const MultiInputFile = ({ onListState, setFileList }) => {
  const multiFilePicker = useRef(null);

  const [path, setPath] = useState(null);

  const handlerPicker = () => {
    multiFilePicker.current.click();
  };

  const saveImgGroup = (e) => {
    const pathArr = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const fileArr = Array.from(e.target.files);
    setPath(pathArr);
    setFileList((prev) => fileArr);
  };

  return (
    <>
      <Button onClick={handlerPicker} color="orange">
        Выбрать фотографии для описания
      </Button>
      <div className="flex flex-wrap">
        {onListState &&
          onListState.map((file, i) => {
            return (
              <div key={file.lastModified} className="m-3">
                <img src={`${path[i]}`} alt="" className="w-20" />
              </div>
            );
          })}
      </div>

      <input
        className="sr-only"
        onChange={saveImgGroup}
        accept=".jpg, .jpeg,"
        type="file"
        id="file"
        multiple
        label="Другие фото"
        required
        ref={multiFilePicker}
      />
    </>
  );
};

MultiInputFile.propTypes = {
  setFileList: PropTypes.func,
  onListState: PropTypes.array,
};

export default MultiInputFile;
