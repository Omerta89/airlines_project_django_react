import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/user/Login";
import Flights from "./features/flight/Flights";
<link rel={"stylesheet"} href={"https://www.w3schools.com/w3css/4/w3.css"}></link> // w3 css style sheet



const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>

  <BrowserRouter>
      <Provider store={store}>
        <Routes>


          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} /> 
          <Route path="flights" element={<Flights />} />  </Route>
        </Routes>

      </Provider>
  </BrowserRouter>
  </React.StrictMode>


);
