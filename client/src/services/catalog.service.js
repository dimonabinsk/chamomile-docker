import httpService from "./http.service";

const catalogEndPoint = "catalog/";

const catalogService = {
  getAll: async () => {
    const { data } = await httpService.get(catalogEndPoint);
    return data;
  },
  upload: async (payload) => {
    const { data } = await httpService.post(
      catalogEndPoint + "upload/",
      payload
    );
    return data;
  },
  update: async (productId, payload, price, idAt) => {
    const { data } = await httpService.patch(catalogEndPoint + productId, {
      payload,
      price,
      idAt,
    });
    return data;
  },
  delete: async (productId, idAt) => {
    const { data } = await httpService.delete(catalogEndPoint + productId);
    return data;
  },
};

export default catalogService;
