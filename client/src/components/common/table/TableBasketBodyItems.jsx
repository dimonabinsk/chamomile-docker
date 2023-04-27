import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useActionsBasket } from "../../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const TableBasketBodyItems = ({
  productBasketKey,
  productBasketValue,
  catalog,
  pathBase,
  currentBasket,
  isLoadingProductStatus,
  isLoadingBasket,
}) => {
  const { addToBasket, deleteToBasket } = useActionsBasket();

  return productBasketKey.map((prodKey, i) => {
    const currentProduct = catalog.find((c) => c._id === prodKey);
    return (
      <tr
        key={prodKey + i}
        className={` border-b ${
          i % 2 === 0 ? "bg-gray-300" : "bg-main-white"
        } `}
      >
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {i + 1}
        </td>
        <td className="truncate whitespace-nowrap px-6 py-4 font-miama text-lg font-semibold text-graphite">
          <Avatar
            src={pathBase + productBasketValue[i].img}
            alt="avatar"
            size="lg"
            className="mr-2"
          />
          {productBasketValue[i].name}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-base font-semibold text-gray-900">
          {productBasketValue[i].price}
        </td>
        <td className="flex justify-center whitespace-nowrap px-6 py-6 text-sm font-light text-gray-900">
          <IconButton
            color="red"
            size="sm"
            onClick={() =>
              deleteToBasket(
                currentBasket[0],
                isLoadingProductStatus,
                isLoadingBasket,
                { ...currentProduct },
                prodKey
              )
            }
          >
            <FontAwesomeIcon icon={faMinus} />
          </IconButton>
          <Typography className="mx-2 pt-1 text-base font-semibold text-gray-900">
            {productBasketValue[i].quantity}
          </Typography>
          <IconButton
            color="green"
            size="sm"
            onClick={() =>
              addToBasket(
                currentBasket[0],
                isLoadingProductStatus,
                isLoadingBasket,
                { ...currentProduct },
                prodKey
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-center text-base font-semibold text-gray-900">
          {productBasketValue[i].totalPrice}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
          <Button color="orange">Удалить</Button>
        </td>
      </tr>
    );
  });
};

TableBasketBodyItems.propTypes = {
  pathBase: PropTypes.string,
  productBasketKey: PropTypes.array,
  productBasketValue: PropTypes.array,
  catalog: PropTypes.array,
  currentBasket: PropTypes.array,
  isLoadingProductStatus: PropTypes.bool,
  isLoadingBasket: PropTypes.bool,
};

export default TableBasketBodyItems;
