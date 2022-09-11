import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flights from "./features/flight/Flights";
import AddFlight from "./features/flight/AddFlight";
import AddCountry from "./features/country/AddCountry";
import Register from "./features/user/Register";
import ProfileRegister from "./features/user/ProfileRegister";
import Countrys from "./features/country/Countrys";
import AirlineRegister from "./features/user/AirlineRegister";
import CustomerTickets from "./features/ticket/CustomerTickets";
import SignIn from "./features/user/SignIn";

<link href={"https://fonts.googleapis.com/icon?family=Material+Icons"}
      rel={"stylesheet"}></link>

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="signin" element={<SignIn />} />
            <Route path="flights" element={<Flights />} />
            <Route path="addflight" element={<AddFlight />} />
            <Route path="register" element={<Register />} />
            <Route path="addcountry" element={<AddCountry />} />
            <Route path="countrys" element={<Countrys />} />
            <Route path="addprofile" element={<ProfileRegister />} />
            <Route path="addairline" element={<AirlineRegister />} />
            <Route path="custickets" element={<CustomerTickets />} />


          </Route>
          {/* 404 not found route  */}
          <Route path="*" element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>);
