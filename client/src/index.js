import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";

import { createStore } from "./store/createStore";
import history from "./utilities/history";
import App from "./App";

const store = createStore();

document.body.className =
  "transition-all bg-main-white dark:bg-main-black-body font-bk-rt";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  </Provider>
);
