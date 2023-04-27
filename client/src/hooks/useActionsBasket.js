import { useDispatch } from "react-redux";
import { addBasket, updateBasket } from "../store/basket";

export function useActionsBasket() {
  const dispatch = useDispatch();

  function addToBasket(
    userBasket,
    isLoadingProductStatus,
    isLoadingBasket,
    currentProduct,
    plantId
  ) {
    if (!isLoadingProductStatus && !isLoadingBasket && userBasket) {
      console.log(currentProduct);
      if (userBasket.basket.product === false) {
        const basket = {
          ...userBasket,
          totalPrice: currentProduct.price,
          totalQuantity: 1,
          basket: {
            [plantId]: {
              name: currentProduct.name,
              img: currentProduct.imgMain,
              quantity: 1,
              price: currentProduct.price,
              totalPrice: currentProduct.price,
            },
            product: true,
          },
        };

        dispatch(addBasket(basket));
      }
      if (userBasket.basket[plantId]) {
        const key = userBasket.basket[plantId];
        const price = userBasket.totalPrice;
        const quantity = userBasket.totalQuantity;
        const basket = {
          ...userBasket,
          totalPrice: price + currentProduct.price,
          totalQuantity: quantity + 1,
          basket: {
            ...userBasket.basket,
            [plantId]: {
              ...key,
              quantity: key.quantity + 1,
              totalPrice: key.totalPrice + currentProduct.price,
            },
            product: true,
          },
        };
        console.log("basket update");
        dispatch(updateBasket(basket));
      }
      if (!userBasket.basket[plantId] && userBasket.basket.product === true) {
        const price = userBasket.totalPrice;
        const quantity = userBasket.totalQuantity;
        const basket = {
          ...userBasket,
          totalPrice: price + currentProduct.price,
          totalQuantity: quantity + 1,
          basket: {
            ...userBasket.basket,
            [plantId]: {
              name: currentProduct.name,
              img: currentProduct.imgMain,
              quantity: 1,
              price: currentProduct.price,
              totalPrice: currentProduct.price,
            },
            product: true,
          },
        };
        console.log("basket new product add");
        dispatch(updateBasket(basket));
      }
    }
  }

  function deleteToBasket(
    userBasket,
    isLoadingProductStatus,
    isLoadingBasket,
    currentProduct,
    plantId
  ) {
    if (!isLoadingProductStatus && !isLoadingBasket && userBasket) {
      if (userBasket.basket[plantId] && userBasket.totalQuantity > 1) {
        const key = userBasket.basket[plantId];
        const price = userBasket.totalPrice;
        const quantity = userBasket.totalQuantity;

        if (userBasket.basket[plantId].quantity <= 1) {
          const delProductBasket = {};

          for (const key in userBasket.basket) {
            if (key !== plantId) {
              delProductBasket[key] = userBasket.basket[key];
            }
          }

          const newBasket = {
            ...userBasket,
            totalPrice: price - currentProduct.price,
            totalQuantity: quantity - 1,
            basket: {
              ...delProductBasket,
              product: true,
            },
          };
          console.log(newBasket);
          dispatch(updateBasket(newBasket));
        } else {
          const basket = {
            ...userBasket,
            totalPrice: price - currentProduct.price,
            totalQuantity: quantity - 1,
            basket: {
              ...userBasket.basket,
              [plantId]: {
                ...key,
                quantity: key.quantity - 1,
                totalPrice: key.totalPrice - currentProduct.price,
              },
              product: true,
            },
          };
          console.log("basket deleteDate");
          dispatch(updateBasket(basket));
        }
      } else {
        const basket = {
          ...userBasket,
          totalPrice: 0,
          totalQuantity: 0,
          basket: {
            product: false,
          },
        };

        dispatch(updateBasket(basket));
      }
    }
  }

  return { addToBasket, deleteToBasket };
}
