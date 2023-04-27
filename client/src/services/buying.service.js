import httpService from "./http.service";

const buyingEndpoint = "buying/";

const buyingService = {
  getBuying: async (userId) => {
    const { data } = await httpService.get(buyingEndpoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`,
      },
    });
    return data;
  },

  addBuying: async (payload) => {
    const { data } = await httpService.get(buyingEndpoint, payload);
    return data;
  },

  deleteBuying: async (productId) => {
    const { data } = await httpService.delete(buyingEndpoint + productId);
    return data;
  },
};

export default buyingService;
