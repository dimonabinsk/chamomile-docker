import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basket";
import catalogReducer from "./catalog";
import usersReducer from "./users";

const rootReducer = combineReducers({
  catalog: catalogReducer,
  users: usersReducer,
  basket: basketReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
