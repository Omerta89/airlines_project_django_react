import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
<link rel={"stylesheet"} href={"https://www.w3schools.com/w3css/4/w3.css"}></link> // w3 css style sheet


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    </React.StrictMode>
);
