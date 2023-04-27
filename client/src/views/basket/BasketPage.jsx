import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

import config from "../../config/config.json";
import { getBasket, getBasketLoadingStatus } from "../../store/basket";
import { SpinnerLoader } from "../../components/ui/spinnerLoader";
import { getCatalog, getCatalogLoadingStatus } from "../../store/catalog";
import {
  TableBasketBodyItems,
  TableBasketBodyNoItems,
} from "../../components/common/table";

const pathBase = config.API_BASE_URL;

const BasketPage = () => {
  const currentBasket = useSelector(getBasket());
  const isLoadingProductStatus = useSelector(getCatalogLoadingStatus());
  const isLoadingBasket = useSelector(getBasketLoadingStatus());
  const catalog = useSelector(getCatalog());
  // console.log(currentBasket);
  if (isLoadingProductStatus && isLoadingBasket) {
    return <SpinnerLoader />;
  } else {
    if (catalog && currentBasket) {
      const productBasketKey = Object.keys(currentBasket[0].basket).filter(
        (el) => el !== "product"
      );
      const productBasketValue = Object.values(currentBasket[0].basket).filter(
        (el) => el !== true
      );

      return (
        <div className="mt-4">
          <Typography
            variant="h4"
            className="text-center font-md-bt dark:text-main-white"
          >
            Корзина
          </Typography>
          <div className="mx-auto mt-4 flex max-w-[90%] flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full ">
                <div className="overflow-hidden rounded-xl shadow-sm shadow-indigo-300">
                  <table className="min-w-full ">
                    <thead className="border-b bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                        >
                          Название
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                        >
                          Цена, 1шт, руб.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                        >
                          Количество
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                        >
                          Цена, всего руб.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBasket[0].basket.product === true ? (
                        <TableBasketBodyItems
                          pathBase={pathBase}
                          productBasketKey={productBasketKey}
                          productBasketValue={productBasketValue}
                          catalog={catalog}
                          currentBasket={currentBasket}
                          isLoadingProductStatus={isLoadingProductStatus}
                          isLoadingBasket={isLoadingBasket}
                        />
                      ) : (
                        <TableBasketBodyNoItems />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default BasketPage;
