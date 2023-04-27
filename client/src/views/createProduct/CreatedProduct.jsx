import { Typography } from "@material-tailwind/react";

import { UploadForm } from "../../components/common";

const CreatedProduct = (props) => {
  return (
    <div className="relative top-12 flex justify-center">
      <div>
        <Typography variant="h2" className="mb-5 dark:text-main-white">
          Создание и добавление товара в каталог
        </Typography>
        <UploadForm />
      </div>
    </div>
  );
};

export default CreatedProduct;
