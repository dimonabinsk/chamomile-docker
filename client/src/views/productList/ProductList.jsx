import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip, Typography } from "@material-tailwind/react";

import {
  deleteCatalogProduct,
  getCatalog,
  updateCatalogProduct,
} from "../../store/catalog";
import { ModalPrice, ModalDelete } from "../../components/common";

import { SpinnerLoader } from "../../components/ui/spinnerLoader";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const catalog = useSelector(getCatalog());
  const [isPrice, setPrice] = useState(100);
  const [isOpenModalPrice, setOpenModalPrice] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [defPrice, setDefPrice] = useState(100);
  const [isName, setName] = useState("");

  const [isProduct, setProduct] = useState(null);

  const handleChangePrice = ({ target }) => {
    setPrice(target.value);
  };

  const toggleModalPrice = (prod) => {
    setProduct(prod);
    setDefPrice(prod.price);
    setName(prod.name);
    setOpenModalPrice(!isOpenModalPrice);
  };
  const toggleModalDelete = (prod) => {
    setProduct(prod);
    setName(prod.name);
    setOpenModalDelete(!isOpenModalDelete);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct((prev) => ({
      ...prev,
      price: isPrice,
    }));
    dispatch(
      updateCatalogProduct(isProduct._id, isProduct, isPrice, isProduct.idAt)
    );
    setOpenModalPrice(!isOpenModalPrice);
  };

  const handleDelete = () => {
    console.log("del");
    dispatch(deleteCatalogProduct(isProduct._id, isProduct.idAt));
    setOpenModalDelete(!isOpenModalDelete);
  };

  function TableBody() {
    return catalog.map((prod, i) => {
      return (
        <tr
          key={prod + i}
          className={`border-b ${
            i % 2 === 0 ? "bg-gray-300" : "bg-main-white"
          } `}
        >
          <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900">
            {i + 1}
          </td>
          <td className="whitespace-nowrap py-4 text-center font-miama text-lg font-semibold text-graphite">
            {prod.name}
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-center font-semibold text-gray-900">
            <Tooltip content="Изменить цену">
              <Button
                variant="outlined"
                color="green"
                onClick={() => toggleModalPrice(prod)}
              >
                {prod.price}
              </Button>
            </Tooltip>
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
            <Tooltip content="Удалить из каталога">
              <Button
                variant="outlined"
                color="red"
                onClick={() => toggleModalDelete(prod)}
              >
                Удалить
              </Button>
            </Tooltip>
          </td>
        </tr>
      );
    });
  }

  if (!catalog) return <SpinnerLoader />;

  return (
    <>
      <div className="relative top-12 text-center">
        <Typography variant="h4" className="dark:text-main-white ">
          Список товаров
        </Typography>
        <div className="mx-auto mt-4 flex max-w-[90%] flex-col ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full ">
              <div className="overflow-hidden rounded-xl shadow-sm shadow-indigo-300">
                <table className="min-w-full">
                  <thead className="border-b bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-4 text-center text-sm font-medium text-gray-900 "
                      >
                        Название
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                      >
                        Цена, 1шт, руб.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                      >
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableBody />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPrice
        isOpen={isOpenModalPrice}
        handler={toggleModalPrice}
        cancel={"Закрыть"}
        type={"number"}
        title={`${isName}`}
        prod={isProduct}
        label={"Цена ₽"}
        nameInput={"product-price"}
        change={handleChangePrice}
        confirm={"Изменить"}
        handleSubmit={handleSubmit}
        defaultValue={defPrice}
      />
      <ModalDelete
        isOpen={isOpenModalDelete}
        handler={toggleModalDelete}
        title={`${isName}`}
        cancel={"Отменить"}
        confirm={"Удалить"}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ProductList;
