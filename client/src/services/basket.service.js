import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const basketEndpoint = "basket/";

const basketService = {
  getBasket: async (userId) => {
    const { data } = await httpService.get(basketEndpoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`,
      },
    });
    return data;
  },

  // getBasketAll: async (payload) => {
  //   const { data } = await httpService.get(basketEndpoint, payload);
  //   return data;
  // },
  updateBasket: async (payload) => {
    const { data } = await httpService.patch(
      basketEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },

  deleteBasket: async (productId) => {
    const { data } = await httpService.delete(basketEndpoint + productId);
    return data;
  },
};

export default basketService;
