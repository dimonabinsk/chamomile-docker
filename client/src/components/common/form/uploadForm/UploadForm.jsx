import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  addCatalogProduct,
  getCatalogLoadingStatus,
  getSubmitFormStatus,
} from "../../../../store/catalog";

import InputFile from "./InputFile";
import MultiInputFile from "./MultiInputFile";

const UploadForm = () => {
  const dispatch = useDispatch();
  const isLoadingCatalogStatus = useSelector(getCatalogLoadingStatus());
  const submitStatus = useSelector(getSubmitFormStatus());
  const [valid, setValid] = useState(true);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [fileName, setFileName] = useState("");
  // const [isSuccess, setSuccess] = useState(false);

  const initialStateData = {
    name: "",
    group: "",
    genus: "",
    family: "",
    price: 0,
    method: null,
    descr: "",
    care: "",
  };

  const [data, setData] = useState(initialStateData);

  const optionsSelect = [
    {
      value: "Комнатные цветы",
      label: "Комнатные цветы",
    },
    {
      value: "Оранжерея",
      label: "Оранжерея",
    },
    {
      value: "Садовые цветы",
      label: "Садовые цветы",
    },
  ];

  useEffect(() => {
    for (const key in data) {
      const element = data[key];
      if (!element) {
        setValid(true);
        return;
      }
      if (!file) {
        setValid(true);
        return;
      }
      if (!fileList) {
        setValid(true);
        return;
      }
      setValid(false);
    }
  }, [data, file, fileList]);

  const handleChangeSelect = (data) => {
    const newData = data.map(({ value }) => value);
    setData((prev) => ({
      ...prev,
      method: [...newData],
    }));
  };

  const handlerChangeField = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    // setSuccess(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img_main", file);
    fileList.forEach((file, i) => {
      formData.append(`img_${i}`, file);
    });
    formData.append("fileName", fileName);
    for (const key in data) {
      const element = data[key];
      formData.append(key, element);
    }
    formData.append("idAt", nanoid(10));
    e.target.reset();
    dispatch(addCatalogProduct(formData));

    setValid(true);
    setData(initialStateData);
    setFile(null);
    setFileList(null);
    setFileName("");
  };

  return (
    <form id="add-product" onSubmit={submitForm}>
      <div>
        <Input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handlerChangeField}
          label="Название цветка"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>
      <div className="mt-5">
        <Input
          type="text"
          name="group"
          id="group"
          value={data.group}
          onChange={handlerChangeField}
          label="Группа растения"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>
      <div className="mt-5">
        <Input
          type="text"
          name="genus"
          id="genus"
          value={data.genus}
          onChange={handlerChangeField}
          label="Род растения"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>
      <div className="mt-5">
        <Input
          type="text"
          name="family"
          id="family"
          value={data.family}
          onChange={handlerChangeField}
          label="Семейство растения"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>

      <div className="mt-5">
        <Input
          type="number"
          name="price"
          id="price"
          value={data.price}
          onChange={handlerChangeField}
          label="₽ Цена"
          className="dark:text-main-white"
          step={10}
          min={100}
          required
        />
      </div>
      <div className="mt-5">
        <Textarea
          name="descr"
          id="descr"
          size="md"
          value={data.descr}
          onChange={handlerChangeField}
          label="Описание растения"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>
      <div className="mt-5">
        <Textarea
          name="care"
          id="care"
          size="md"
          value={data.care}
          onChange={handlerChangeField}
          label="Общий уход"
          color="green"
          className="dark:text-main-white"
          required
        />
      </div>
      <div className="mt-5">
        <InputFile
          onFileState={file}
          setFile={setFile}
          setFileName={setFileName}
        />
      </div>
      <div className="mt-5">
        <MultiInputFile onListState={fileList} setFileList={setFileList} />
      </div>
      <div className="mt-5">
        <Select
          isMulti
          closeMenuOnSelect={false}
          options={optionsSelect}
          name="select"
          classNamePrefix={"select"}
          placeholder="Выберете условия выращивания..."
          className="basic-multi-select"
          onChange={handleChangeSelect}
          id="select"
        />
      </div>
      <div className="flex items-center justify-evenly">
        <div>
          <Button
            type="submit"
            className="mt-5 dark:text-main-white"
            disabled={valid}
            color="green"
          >
            Отправить
          </Button>
        </div>
        {!isLoadingCatalogStatus && submitStatus ? (
          <div className="pt-4">
            <FontAwesomeIcon
              icon={faCheck}
              size="2xl"
              className="text-green-1"
            />
          </div>
        ) : (
          <div className="pt-4">
            <FontAwesomeIcon
              icon={faSpinner}
              size="2xl"
              spin
              className="text-green-1"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default UploadForm;
