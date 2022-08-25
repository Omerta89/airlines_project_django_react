import { configureStore } from "@reduxjs/toolkit";
import flightSlice from '../features/flight/flightSlice';
import loginSlice from '../features/user/loginSlice';
import countrySlice from '../features/country/countrySlice';
import ticketSlice from '../features/ticket/ticketSlice';

export const store = configureStore({
  reducer: {
    flight: flightSlice,
    login : loginSlice,
    ticket : ticketSlice,
    country : countrySlice,
  },
});
