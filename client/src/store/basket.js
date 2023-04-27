import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../services/basket.service";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    isUpdate: false,
  },
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
      state.isUpdate = true;
    },
    basketReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    basketRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    basketAdd: (state, action) => {
      state.entities = [{ ...action.payload }];
      state.isLoading = false;
      state.isUpdate = false;
    },

    basketUpdate: (state, action) => {
      state.entities = [{ ...action.payload }];
      state.isLoading = false;
      state.isUpdate = false;
    },

    basketDelete: (state, action) => {
      state.entities.products = state.entities.products.filter(
        (el) => el._id !== action.payload
      );
    },
  },
});

const { reducer: basketReducer, actions } = basketSlice;

const {
  basketRequested,
  basketReceived,
  basketRequestFailed,
  basketAdd,
  basketDelete,
  basketUpdate,
} = actions;

const addBasketRequested = createAction("basket/addBasketRequested");
const updateBasketRequested = createAction("basket/updateBasketRequested");
const deleteBasketRequested = createAction("basket/deleteBasketRequested");

// создаем корзину пользователя при регистрации по userId в mongoDB
export const loadBasketUser = (userId) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const { content } = await basketService.getBasket(userId);
    dispatch(basketReceived(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

// изменяем корзину в первый раз созданную на сервере по умолчанию при регистрации пользователя
export const addBasket = (payload) => async (dispatch) => {
  dispatch(addBasketRequested());
  try {
    const { content } = await basketService.updateBasket(payload);
    dispatch(basketAdd(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};
// добавляем в корзину товары
export const updateBasket = (payload) => async (dispatch) => {
  dispatch(updateBasketRequested());
  try {
    const { content } = await basketService.updateBasket(payload);
    dispatch(basketUpdate(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const deleteBasket = (productId) => async (dispatch) => {
  dispatch(deleteBasketRequested());
  try {
    const { content } = await basketService.deleteBasket(productId);
    if (!content) dispatch(basketDelete(productId));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const getBasket = () => (state) => state.basket.entities;

export const getBasketById = (id) => (state) => {};

export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export default basketReducer;
