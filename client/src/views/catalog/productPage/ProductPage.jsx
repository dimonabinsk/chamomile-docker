import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";

import { getBasket, getBasketLoadingStatus } from "../../../store/basket";
import {
  getCatalogLoadingStatus,
  getProductById,
} from "../../../store/catalog";
import { SpinnerLoader } from "../../../components/ui/spinnerLoader";
import { useActionsBasket } from "../../../hooks";
import { SwiperSlider } from "../../../components/common";

const ProductPage = () => {
  const { plantId } = useParams();

  // const dispatch = useDispatch();
  const isLoadingBasket = useSelector(getBasketLoadingStatus());
  const currentProduct = useSelector(getProductById(plantId));
  const isLoadingProductStatus = useSelector(getCatalogLoadingStatus());
  const userBasket = useSelector(getBasket());

  const { addToBasket } = useActionsBasket(plantId);

  if (isLoadingProductStatus && isLoadingProductStatus && userBasket)
    return <SpinnerLoader />;

  if (currentProduct) {
    const product = { ...currentProduct };
    return (
      <section className="relative top-16 mx-4">
        <Typography variant="h2" alt="описание товара" className="sr-only">
          Описание товара
        </Typography>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="">
            <SwiperSlider product={product} />
          </div>
          <div className="">
            <Typography
              variant="h3"
              className="ml-3 font-miama text-green-4 dark:text-green-1"
            >
              {product.name}
            </Typography>

            {product.descr.p.split("\n").map((p, i) => (
              <Typography
                key={i + "abc"}
                className="mt-4 px-1 font-bk-rt dark:text-main-white lg:mt-5 lg:px-4"
              >
                {p}
              </Typography>
            ))}

            <Typography className="mt-5 px-4 text-2xl dark:text-main-white">
              ₽{product.price}
            </Typography>

            <Button
              color="green"
              onClick={() =>
                addToBasket(
                  userBasket[0],
                  isLoadingProductStatus,
                  isLoadingBasket,
                  product,
                  plantId
                )
              }
              className="ml-3 mt-5"
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
};

export default ProductPage;
